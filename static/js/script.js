document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatForm = document.getElementById('chat-form');
    
    // Store chat history
    let chatHistory = [];
    
    // Add welcome message
    addBotMessage(`Hello! I'm MediChatBot, your medical assistant. I can help you with health questions and symptom assessment. How can I help you today?`);
    
    // Event listeners
    chatForm.addEventListener('submit', handleSendMessage);
    messageInput.addEventListener('keydown', handleInputKeydown);
    
    // Focus the input field when the page loads
    messageInput.focus();
    
    /**
     * Send message when Enter key is pressed
     */
    function handleInputKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    }
    
    /**
     * Handle sending a message
     */
    function handleSendMessage(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input field
            messageInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Send message to API
            sendMessageToAPI(message);
        }
    }
    
    /**
     * Send message to backend API
     */
    function sendMessageToAPI(message) {
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: chatHistory
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide typing indicator
            hideTypingIndicator();
            
            // Process and display response
            if (data.status === 'success') {
                processBotResponse(data.response);
            } else {
                throw new Error(data.error || 'Unknown error occurred');
            }
        })
        .catch(error => {
            // Hide typing indicator
            hideTypingIndicator();
            
            // Show error message
            addBotMessage(`I'm sorry, but there was an error processing your request: ${error.message}. Please try again later.`);
            console.error('Error:', error);
        });
    }
    
    /**
     * Process bot response and check for potential symptom options
     */
    function processBotResponse(responseText) {
        // Add the bot message to the chat
        addBotMessage(responseText);
        
        // Parse the response for potential symptom options
        // This is a simple implementation - could be enhanced with more sophisticated pattern matching
        const optionsMatch = responseText.match(/(?:select|choose)(?:\s+one)?(?:\s+of)?(?:\s+the)?(?:\s+following)?(?:\s+options)?[:\s]+((?:(?:\s*[-•\*]\s*|\d+\.\s+)[^\n\r]+[\n\r]*)+)/i);
        
        if (optionsMatch) {
            const optionsText = optionsMatch[1];
            const options = optionsText.match(/(?:[-•\*]|\d+\.)\s*([^\n\r]+)/g);
            
            if (options && options.length > 0) {
                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'options-container mt-2';
                
                options.forEach(option => {
                    const cleanOption = option.replace(/^(?:[-•\*]|\d+\.)\s*/, '').trim();
                    
                    const optionButton = document.createElement('button');
                    optionButton.className = 'btn btn-outline-primary symptom-option m-1';
                    optionButton.textContent = cleanOption;
                    optionButton.addEventListener('click', () => {
                        handleOptionSelection(cleanOption);
                    });
                    
                    optionsContainer.appendChild(optionButton);
                });
                
                // Add options to chat
                chatMessages.appendChild(optionsContainer);
                
                // Scroll to bottom
                scrollToBottom();
            }
        }
    }
    
    /**
     * Handle when a user selects a symptom option
     */
    function handleOptionSelection(option) {
        // Add as a user message
        addUserMessage(option);
        
        // Remove options container
        const optionsContainer = document.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send selected option to API
        sendMessageToAPI(option);
    }
    
    /**
     * Add a user message to the chat
     */
    function addUserMessage(message) {
        const messageElement = createMessageElement(message, 'user-message');
        chatMessages.appendChild(messageElement);
        
        // Add to chat history
        chatHistory.push({ user: message });
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    /**
     * Add a bot message to the chat
     */
    function addBotMessage(message) {
        const messageElement = createMessageElement(message, 'bot-message');
        chatMessages.appendChild(messageElement);
        
        // Add to chat history
        chatHistory.push({ bot: message });
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    /**
     * Create a message element
     */
    function createMessageElement(message, className) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        
        // Format links if present
        const formattedMessage = formatLinks(message);
        
        // Allow line breaks
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = formattedMessage.replace(/\n/g, '<br>');
        
        messageElement.appendChild(messageContent);
        
        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.className = 'message-time';
        timestamp.textContent = getCurrentTime();
        messageElement.appendChild(timestamp);
        
        return messageElement;
    }
    
    /**
     * Format links in text to be clickable
     */
    function formatLinks(text) {
        return text.replace(
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    }
    
    /**
     * Get current time in HH:MM format
     */
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    /**
     * Show typing indicator
     */
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingIndicator.appendChild(dot);
        }
        
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    /**
     * Hide typing indicator
     */
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    /**
     * Scroll chat to bottom
     */
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
