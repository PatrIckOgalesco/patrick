document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chat-container");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", () => {
        const userMessage = messageInput.value.trim();
        if (userMessage !== "") {
            displayMessage("user", userMessage);
            sendMessageToChatbot(userMessage);
            messageInput.value = "";
        }
    });

    const displayMessage = (sender, message) => {
        const chatMessage = document.createElement("div");
        chatMessage.classList.add("chat-message", sender);
        chatMessage.textContent = message;
        chatContainer.appendChild(chatMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const sendMessageToChatbot = async (userMessage) => {
        // You need to replace 'YOUR_CHATBOT_API_ENDPOINT' with your actual chatbot API endpoint
        const apiUrl = 'AIzaSyAvA524q6UgIl5fGmsgOHzhgK4tr-Q1dHc';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            if (!response.ok) {
                throw new Error('Chatbot API request failed');
            }

            const result = await response.json();
            const chatbotMessage = result.message; // Adjust according to your API response structure
            displayMessage("chatbot", chatbotMessage);

        } catch (error) {
            console.error('Error sending message to chatbot:', error);
        }
    };
});
