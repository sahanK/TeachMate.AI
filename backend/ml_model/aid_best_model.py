import numpy as np
import pandas as pd

dataset = pd.read_csv('../data/data-6-model.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
print(X[0])
print(y[0])
dataset.head()

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(sparse_output = False), [1, 2, 3, 5])], remainder='passthrough')
X = ct.fit_transform(X)
print(X[0])

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
print(y[0])

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train[:, 22:] = sc.fit_transform(X_train[:, 22:])
X_test[:, 22:] = sc.transform(X_test[:, 22:])
print(X_train[0])

from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(
    bootstrap = False,
    criterion = 'entropy',
    max_depth = None,
    max_features = 'sqrt',
    min_samples_leaf = 2,
    min_samples_split = 2,
    n_estimators = 20
)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(accuracy_score(y_test, y_pred))

import pickle
with open('../ml_model_out/aid_model_out/scalar.pkl', 'wb') as scalar_file:
    pickle.dump(sc, scalar_file)
with open('../ml_model_out/aid_model_out/column_transformer.pkl', 'wb') as column_transformer:
    pickle.dump(ct, column_transformer)
with open('../ml_model_out/aid_model_out/label_encoder.pkl', 'wb') as label_encoder:
    pickle.dump(le, label_encoder)
with open('../ml_model_out/aid_model_out/model.pkl', 'wb') as model_file:
    pickle.dump(classifier, model_file)