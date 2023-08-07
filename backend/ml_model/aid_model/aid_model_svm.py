# Importing libraries
import numpy as np
import pandas as pd

# Importing dataset
dataset = pd.read_csv('../../data/data-6-model.csv')
X = dataset.iloc[:, 2:-2].values
y = dataset.iloc[:, -2].values

# Encode categorical data
# Encode Independent variables
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(sparse_output = False), [0, 1, 3])], remainder='passthrough')
X = ct.fit_transform(X)

# Encode Dependant variables
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)

# Split dataset into Test set and Train set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Feature scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train[:, 21:] = sc.fit_transform(X_train[:, 21:])
X_test[:, 21:] = sc.transform(X_test[:, 21:])

# Train SVM model on the Train set
from sklearn.svm import SVC
classifier = SVC(kernel = 'linear', random_state = 0)
classifier.fit(X_train, y_train)

# Predict the Test set results
y_pred = classifier.predict(X_test)

# Create Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(accuracy_score(y_test, y_pred))

# # Applying K-Fold Cross Validation
# from sklearn.model_selection import cross_val_score
# accuracies = cross_val_score(estimator = classifier, X = X_train, y = y_train, cv = 10)
# print("Accuracy : {:.2f}".format(accuracies.mean()*100))
# print("Standard Deviation : {:.2f}".format(accuracies.std()*100))

# # Applying GridSearch to find the best model and the best parameters
# from sklearn.model_selection import GridSearchCV
# parameters = [{'C': [0.25, 0.5, 0.75, 1.0], 'kernel': ['linear']},
#               {'C': [0.25, 0.5, 0.75, 1.0], 'kernel': ['rbf'], 'gamma': [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}]
# grid_search = GridSearchCV(estimator = classifier,
#                            param_grid = parameters,
#                            cv = 10,
#                            n_jobs = -1)
# grid_search.fit(X_train, y_train)
# best_accuracy = grid_search.best_score_
# best_parameters = grid_search.best_params_
# print("Best Accuracy : {:.2f}".format(best_accuracy*100))
# print("Best parameters : ", best_parameters)
