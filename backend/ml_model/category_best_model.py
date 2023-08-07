# Importing libraries
import numpy as np
import pandas as pd

# Importing dataset
dataset = pd.read_csv('../data/data-6-model.csv')
X = dataset.iloc[:, 2:-3].values
y = dataset.iloc[:, -3].values

# Encode categorical data
# Encode Independent variables
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(sparse_output = False), [0, 1])], remainder='passthrough')
X = ct.fit_transform(X)

# Encode Dependant variables
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

# Split dataset into Test set and Train set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 1)

# Feature scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train[:, 16:] = sc.fit_transform(X_train[:, 16:])
X_test[:, 16:] = sc.transform(X_test[:, 16:])

# Train XGBoost model on the Train set
from xgboost import XGBClassifier
classifier = XGBClassifier(learning_rate = 0.6, max_depth = 4, n_estimators = 10, subsample = 1)
classifier.fit(X_train, y_train)

# Predict the Test set results
y_pred = classifier.predict(X_test)
print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))

# Create Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(accuracy_score(y_test, y_pred))

# Applying K-Fold Cross Validation
from sklearn.model_selection import cross_val_score
accuracies = cross_val_score(estimator = classifier, X = X_train, y = y_train, cv = 10)
print("Accuracy : {:.2f}".format(accuracies.mean()*100))
print("Standard Deviation : {:.2f}".format(accuracies.std()*100))

# Save the encoder, scalar and model
import pickle
with open('../ml_model_out/scalar.pkl', 'wb') as scalar_file:
    pickle.dump(sc, scalar_file)
with open('../ml_model_out/column_transformer.pkl', 'wb') as column_transformer:
    pickle.dump(ct, column_transformer)
with open('../ml_model_out/label_encoder.pkl', 'wb') as label_encoder:
    pickle.dump(le, label_encoder)
with open('../ml_model_out/model.pkl', 'wb') as model_file:
    pickle.dump(classifier, model_file)
