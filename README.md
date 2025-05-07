# MediChatBot - Your Medical Assistant

MediChatBot is an AI-powered medical assistant that provides health information and symptom assessment through a chat interface. The application uses Google's Gemini API to generate responses based on user input.

## Features

- Clean, medical-themed UI with a chat interface
- Symptom-based conversation capabilities
- Health advice and recommendations
- Chat history within the current session
- Interactive symptom selection options
- Ability to ask follow-up questions about symptoms
- Responsive design for all devices

## Prerequisites

Before running the application, you'll need:

- Windows 10 or 11
- Python 3.8 or higher
- Visual Studio Code
- A Gemini API key from Google AI Studio

## Detailed Installation Guide for Windows

### Step 1: Install Required Software

1. **Install Python**:
   - Download Python from [python.org](https://www.python.org/downloads/)
   - During installation, check the box "Add Python to PATH"
   - Click "Install Now" and complete the installation

2. **Install Visual Studio Code**:
   - Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/download)
   - Run the installer and follow the default installation options
   - Launch VS Code after installation

3. **Install Git** (optional, if you plan to clone the repository):
   - Download Git from [git-scm.com](https://git-scm.com/download/win)
   - Run the installer with default options

### Step 2: Get a Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to the "API Keys" section
4. Create a new API key
5. Copy the API key (you'll need it later)

### Step 3: Set Up the Project

1. **Download the Project**:
   - **Option 1**: Download the ZIP file and extract it to a folder of your choice
   - **Option 2**: Clone the repository using Git:
     ```
     git clone https://github.com/yourusername/medichatbot.git
     ```

2. **Open the Project in VS Code**:
   - Open VS Code
   - Click on "File" > "Open Folder"
   - Navigate to the MediChatBot folder and click "Select Folder"

3. **Install VS Code Extensions** (recommended):
   - Click on the Extensions icon in the sidebar (or press Ctrl+Shift+X)
   - Search for and install:
     - "Python" by Microsoft
     - "Pylance" by Microsoft

### Step 4: Create a Virtual Environment

1. **Open a Terminal in VS Code**:
   - Click on "Terminal" > "New Terminal"

2. **Create a Virtual Environment**:
   ```
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   ```
   .\venv\Scripts\activate
   ```
   
   You'll see `(venv)` appear at the beginning of your terminal line, indicating the virtual environment is active.

### Step 5: Install Dependencies

1. **With the virtual environment activated, install the required packages**:
   
   **Option 1**: Install directly using pip:
   ```
   pip install flask flask-cors gunicorn python-dotenv google-generativeai
   ```
   
   **Option 2**: Install using the provided requirements file:
   ```
   pip install -r requirements_for_local.txt
   ```

### Step 6: Configure Environment Variables

1. **Create a .env file**:
   - Right-click in the Explorer pane in VS Code
   - Select "New File"
   - Name it `.env`
   - Add the following content:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     SESSION_SECRET=any_random_string_for_security
     FLASK_DEBUG=True
     ```
   - Replace `your_gemini_api_key_here` with the API key you copied earlier
   - For `any_random_string_for_security`, you can use any random string (e.g., "medichatbot-secret-key")

### Step 7: Run the Application

1. **Make sure your virtual environment is activated** (`(venv)` should be visible in your terminal prompt)

2. **Run the application**:
   ```
   python main.py
   ```

3. **Access the application**:
   - Open your web browser
   - Navigate to: `http://localhost:5000`
   - You should see the MediChatBot interface

## Troubleshooting

### Common Issues and Solutions

1. **ImportError: No module named 'flask'**:
   - Make sure your virtual environment is activated
   - Reinstall the dependencies: `pip install flask flask-cors gunicorn python-dotenv google-generativeai`

2. **Error related to Gemini API key**:
   - Check that your .env file contains the correct API key
   - Ensure there are no spaces around the equals sign in the .env file
   - Verify that your API key is active in Google AI Studio

3. **Address already in use**:
   - Another application might be using port 5000
   - Change the port in main.py to another number (e.g., 5001)
   - Restart the application

4. **Virtual environment not activating**:
   - If you get a PowerShell execution policy error, run:
     ```
     Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
     ```
   - Then try activating the virtual environment again

## Project Structure

- `main.py`: Entry point for the application
- `app.py`: Flask application setup and routes
- `medical_prompts.py`: Functions for generating medical prompts
- `templates/`: HTML templates
  - `index.html`: Main chat interface
- `static/`: CSS, JavaScript, and other static assets
  - `css/style.css`: Custom styling for the chat interface
  - `js/script.js`: Client-side JavaScript for handling chat interactions
- `.env.example`: Example environment variables file
- `requirements_for_local.txt`: Dependencies for local development
- `LICENSE`: MIT License file

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for providing the language model
- Flask for the web framework
- Bootstrap for the UI components
     
