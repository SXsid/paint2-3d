from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=['http://localhost:5174/'],supports_credentials=True)

@app.route('/',methods=['GET'])
def home():
    return "server is up"
if __name__=="__main__":
    app.run(debug=True ,port=8080)