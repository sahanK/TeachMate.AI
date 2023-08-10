from flask import Flask, request
import pickle

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

@app.route('/predict', methods=['POST'])
def hello_world():
    data = [[int(request.json['grade']),
             request.json['subject'],
             request.json['lesson'],
             request.json['interest'],
             int(request.json['lesson_average_mark'])]]
    
    category_data = category_column_transformer.transform(data)
    category_data[:, 15:] = category_scalar.transform(category_data[:, 15:])
    predicted = category_model.predict(category_data)
    predicted_category = category_mapping[predicted[0]]

    data = [[int(request.json['grade']),
            request.json['subject'],
            request.json['lesson'],
            request.json['interest'],
            int(request.json['lesson_average_mark']),
            predicted_category]]

    aid_data = aid_column_transformer.transform(data)
    aid_data[:, 20:] = category_scalar.transform(aid_data[:, 20:])
    predicted = aid_model.predict(aid_data)
    predicted_aid = aid_mapping[predicted[0]]
    return {
        'teaching_aid_category': predicted_category,
        'teaching_aid': predicted_aid,
    }