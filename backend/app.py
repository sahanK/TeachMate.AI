from flask import Flask, request, Response
import pickle
import openai
import constants
from dotenv import load_dotenv
import os
from flask_cors import cross_origin

load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')

with open('./ml_model_out/category_model_out/column_transformer.pkl', 'rb') as category_column_transformer_file:
    category_column_transformer = pickle.load(category_column_transformer_file)
with open('./ml_model_out/category_model_out/label_encoder.pkl', 'rb') as category_label_encoder_file:
    category_label_encoder = pickle.load(category_label_encoder_file)
with open('./ml_model_out/category_model_out/scalar.pkl', 'rb') as category_scalar_file:
    category_scalar = pickle.load(category_scalar_file)
with open('./ml_model_out/category_model_out/model.pkl', 'rb') as category_model_file:
    category_model = pickle.load(category_model_file)

with open('./ml_model_out/aid_model_out/column_transformer.pkl', 'rb') as aid_column_transformer_file:
    aid_column_transformer = pickle.load(aid_column_transformer_file)
with open('./ml_model_out/aid_model_out/label_encoder.pkl', 'rb') as aid_label_encoder_file:
    aid_label_encoder = pickle.load(aid_label_encoder_file)
with open('./ml_model_out/aid_model_out/scalar.pkl', 'rb') as aid_scalar_file:
    aid_scalar = pickle.load(aid_scalar_file)
with open('./ml_model_out/aid_model_out/model.pkl', 'rb') as aid_model_file:
    aid_model = pickle.load(aid_model_file)

category_mapping = dict(zip(category_label_encoder.transform(category_label_encoder.classes_), category_label_encoder.classes_))
aid_mapping = dict(zip(aid_label_encoder.transform(aid_label_encoder.classes_), aid_label_encoder.classes_))

app = Flask(__name__)
openai.api_key = openai_api_key

@app.route('/predict', methods=['POST'])
@cross_origin()
def hello_world():
    try:
        grade = request.json['grade']
        subject = request.json['subject']
        lesson = request.json['lesson']
        interest = request.json['interest']
        lesson_average_mark = request.json['lesson_average_mark']
        teaching_objectives = request.json['teaching_objectives']

        if not isinstance(grade, int):
            raise TypeError('grade should be an integer')
        if not grade in constants.ALLOWED_GRADES:
            raise TypeError(f'grade {grade} is not supported')
        if not isinstance(subject, str):
            raise TypeError('subject should be a string')
        if not subject in constants.ALLOWED_SUBJECTS:
            raise TypeError(f'subject {subject} is not supported')
        if not isinstance(lesson, str):
            raise TypeError('lesson should be a string')
        if not isinstance(interest, str):
            raise TypeError('subject should be a string')
        if not interest in constants.ALLOWED_INTERESTS:
            raise TypeError(f'interest {interest} is not supported')
        if not isinstance(lesson_average_mark, int):
            raise TypeError('lesson_average_mark should be an integer')
        if not constants.LESSON_AVERAGE_MARK_MIN <= lesson_average_mark <= constants.LESSON_AVERAGE_MARK_MAX:
            raise TypeError(f'lesson_average_mark should be in between {constants.LESSON_AVERAGE_MARK_MIN} and {constants.LESSON_AVERAGE_MARK_MAX}')
        if not isinstance(teaching_objectives, list):
            raise TypeError('teaching_objectives should be a list of strings')
        if not all(isinstance(item, str) for item in teaching_objectives):
            raise TypeError('teaching_objectives should be a list of strings')

        data = [[int(grade),
            subject,
            lesson,
            interest,
            int(lesson_average_mark)]]
        
        category_data = category_column_transformer.transform(data)
        category_data[:, 17:] = category_scalar.transform(category_data[:, 17:])
        predicted = category_model.predict(category_data)
        predicted_category = category_mapping[predicted[0]]


        data = [[int(grade),
            subject,
            lesson,
            interest,
            int(lesson_average_mark),
            predicted_category]]

        aid_data = aid_column_transformer.transform(data)
        aid_data[:, 22:] = category_scalar.transform(aid_data[:, 22:])
        predicted = aid_model.predict(aid_data)
        predicted_aid = aid_mapping[predicted[0]]

        teaching_objectives_string = ', '.join(teaching_objectives)
        message = f"Write a lesson plan for teaching {request.json['lesson']} lesson in {request.json['subject']} for a grade {request.json['grade']} class using a {predicted_aid}. \nThe teaching objectives are {teaching_objectives_string}"

        lesson_plan = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                "role": "user",
                "content": message
                }
            ],
            temperature=0,
            max_tokens=2048,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        return {
            'teaching_aid_category': predicted_category,
            'teaching_aid': predicted_aid,
            'lesson_plan': lesson_plan
        }
    except KeyError as key_error:
        print(key_error)
        return {
            'message': f'Please provide {key_error}'
        }, 400
    except TypeError as type_error:
        print(type_error)
        return {
            'message': type_error.args[0]
        }, 400
    except:
        return {
            'message': 'Something went wrong in our side'
        }, 500
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)