# Importing libraries
import numpy as np
import pandas as pd

# Importing dataset
dataset = pd.read_csv('../../data/data-6-model.csv')
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
classifier = XGBClassifier()
classifier.fit(X_train, y_train)

# Predict the Test set results
y_pred = classifier.predict(X_test)
print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))

# Create Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(accuracy_score(y_test, y_pred))

# Applying GridSearch to find the best hyperparameters
from sklearn.model_selection import GridSearchCV
paramters = [{'max_depth': [1, 2, 3, 4, 5, 6],
              'subsample': [0.5, 0.6, 0.7, 0.8, 0.9, 1],
              'n_estimators': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
              'learning_rate': [0.5, 0.6, 0.7, 0.8, 0.9, 1]}]
grid_search = GridSearchCV(estimator = classifier,
                           param_grid = paramters,
                           cv = 10,
                           n_jobs = -1)
grid_search.fit(X_train, y_train)
best_accuracy = grid_search.best_score_
best_parameters = grid_search.best_params_
print("Best Accuracy : {:.2f}".format(best_accuracy*100))
print("Best parameters : ", best_parameters)