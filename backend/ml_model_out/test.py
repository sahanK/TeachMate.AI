import pickle

with open('./column_transformer.pkl', 'rb') as column_transformer_file:
    column_transformer = pickle.load(column_transformer_file)
with open('./label_encoder.pkl', 'rb') as label_encoder_file:
    label_encoder = pickle.load(label_encoder_file)
with open('./scalar.pkl', 'rb') as scalar_file:
    scalar = pickle.load(scalar_file)
with open('./model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


# Create a mapping dictionary
category_mapping = dict(zip(label_encoder.transform(label_encoder.classes_), label_encoder.classes_))
data = [['Addition', 'Games', 45]]
data = column_transformer.transform(data)
print(data)
data[:, 16:] = scalar.transform(data[:, 16:])
print(data)
predicted = model.predict(data)
print(category_mapping[predicted[0]])