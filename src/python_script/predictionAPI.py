from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

#load model
with open('C:\\Users\\panda\\OneDrive\\Documents\\PCDocs\\KPMG\\.vscode\\Chatbot\\src\\python_script\\budgetEstimationModel.pkl', 'rb') as file:
    model = pickle.load(file)

app = Flask(__name__)
app.config['ENV'] = 'development'
CORS(app)

@app.route('/', methods=['GET'])
def get():
    param1 = request.args.get('param1', 3)
    param2 = request.args.get('param2', 0)
    param1 = int(param1)
    param2 = int(param2)
    print(type(param1), type(param2))
    prediction = model.predict([[param1, param2]])
    prediction = prediction[0][0]
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)