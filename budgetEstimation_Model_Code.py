from sklearn import preprocessing as pp
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import seaborn as sns 
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression 
import pickle

np.set_printoptions(precision=2)

data = pd.read_csv('C:\\Users\\panda\\OneDrive\\Documents\\PCDocs\\KPMG\\.vscode\\Chatbot\\src\\python_script\\data.csv')

#data one hot encoding 
data['project_type'] = data['project_type'].astype('category')
data['type'] = data['project_type'].cat.codes

enc = pp.OneHotEncoder()
enc_data = pd.DataFrame(enc.fit_transform(data[['type']]).toarray())

new_data = data.join(enc_data)
new_data = new_data.drop(['project_type', 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], axis=1)

#data preprocessing
new_data['budget_amount'] = new_data.budget_amount.apply(lambda x: np.where(x.isnumeric(), x, 0))
new_data.fillna(0, inplace=True)

corr = new_data.corr()
sns.heatmap(corr, 
            xticklabels=corr.columns.values,
            yticklabels=corr.columns.values)

targetVariable = ['budget_amount']
predictor = ['estimated_cost', 'type']

x = new_data[predictor].values
y = new_data[targetVariable].values

#Scaling data
x_scaler = pp.StandardScaler()
y_scaler = pp.StandardScaler()
x_scaled = x_scaler.fit_transform(x)
y_scaled = y_scaler.fit_transform(y)

# print(x_scaled.shape)
# print(y_scaled.shape)

#splitting data
x_train, x_test, y_train, y_test = train_test_split(x_scaled, y_scaled, test_size=0.2, shuffle=True)

#create model
model = LinearRegression()
model.fit(x_train, y_train)
predictions = model.predict(x_test)

#model evaluation
# print('mean_squared_error: ', mean_squared_error(y_test, predictions))
# print('mean_absolute_error: ', mean_absolute_error(y_test, predictions))

#plotting the results
plt.scatter(y_test, predictions)
plt.xlabel('True Values')
plt.ylabel('Predictions')
# plt.show()

#calculate performance metrics
accuracy = model.score(x_test, y_test)
# print('accuracy: ', int(accuracy*100))

#export model
with open('C:\\Users\\panda\\OneDrive\\Documents\\PCDocs\\KPMG\\.vscode\\Chatbot\\src\\python_script\\budgetEstimation.pkl', 'wb') as f:
    pickle.dump(model, f)
    print("model dumped!")