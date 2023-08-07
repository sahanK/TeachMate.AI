from flask import Flask, request
import pickle

with open('./ml_model_out/column_transformer.pkl', 'rb') as column_transformer_file:
    column_transformer = pickle.load(column_transformer_file)
with open('./ml_model_out/label_encoder.pkl', 'rb') as label_encoder_file:
    label_encoder = pickle.load(label_encoder_file)
with open('./ml_model_out/scalar.pkl', 'rb') as scalar_file:
    scalar = pickle.load(scalar_file)
with open('./ml_model_out/model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

category_mapping = dict(zip(label_encoder.transform(label_encoder.classes_), label_encoder.classes_))

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def hello_world():
    data = [[request.json['lesson'], request.json['interest'], int(request.json['lesson_average_mark'])]]
    data = column_transformer.transform(data)
    data[:, 16:] = scalar.transform(data[:, 16:])
    predicted = model.predict(data)
    return {
        'teaching_aid_category': category_mapping[predicted[0]]
    }