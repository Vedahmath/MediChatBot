import os
import logging
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from medical_prompts import get_medical_prompt
import google.generativeai as genai

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "medichatbot-secret-key")
CORS(app)

# Initialize Gemini API client
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-pro")
    logging.info("Gemini API client initialized successfully")
except Exception as e:
    logging.error(f"Failed to initialize Gemini API client: {e}")

@app.route('/')
def index():
    """Render the main page of the application."""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests and communicate with Gemini API."""
    try:
        data = request.get_json()
        user_input = data.get('message', '')
        chat_history = data.get('history', [])
        
        if not user_input:
            return jsonify({"error": "No message provided"}), 400
        
        # Format the medical prompt
        medical_prompt = get_medical_prompt(user_input, chat_history)
        
        # Get response from Gemini API
        response = model.generate_content(medical_prompt)
        
        return jsonify({
            "response": response.text,
            "status": "success"
        })
    
    except Exception as e:
        logging.error(f"Error in chat endpoint: {e}")
        return jsonify({
            "error": f"An error occurred: {str(e)}",
            "status": "error"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
