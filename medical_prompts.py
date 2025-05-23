def get_medical_prompt(user_input, chat_history):
    """
    Creates a tailored medical prompt for the Gemini API based on the user input and chat history.
    
    Args:
        user_input (str): The current user message
        chat_history (list): Previous exchanges in the conversation
    
    Returns:
        str: A formatted prompt for the Gemini API
    """
    # Base instructions for the medical chat assistant
    system_prompt = """
    You are MediChatBot, a medical assistant chatbot. Your role is to provide helpful health information and preliminary symptom assessment. Follow these guidelines:

    1. Provide factual medical information based on current medical knowledge
    2. Ask specific follow-up questions to better understand symptoms
    3. Recommend when users should seek professional medical help
    4. Do not diagnose specific conditions, but suggest possibilities
    5. Be empathetic and patient-focused
    6. Give straightforward, clear information without medical jargon
    7. For serious symptoms, always advise consulting a healthcare professional
    8. When appropriate, suggest potential specialists who might help with specific symptoms
    9. Never prescribe medications or specific treatments
    10. Present information in a structured, easy-to-understand format
    
    Remember that you are not a replacement for professional medical advice, diagnosis, or treatment.
    """
    
    # Format the conversation history as context
    conversation_context = ""
    if chat_history:
        for exchange in chat_history:
            if 'user' in exchange:
                conversation_context += f"User: {exchange['user']}\n"
            if 'bot' in exchange:
                conversation_context += f"MediChatBot: {exchange['bot']}\n"
    
    # Construct the full prompt
    full_prompt = f"{system_prompt}\n\n"
    
    if conversation_context:
        full_prompt += f"Previous conversation:\n{conversation_context}\n\n"
    
    full_prompt += f"User's current message: {user_input}\n\nYour response:"
    
    return full_prompt
