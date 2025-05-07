document.getElementById('sendButton').addEventListener('click', async (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value;
    console.log('userInput is',userInput);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
            // Update the UI with the response
            //document.getElementById('responseDisplay').innerText = data.reply;
            const chatContainer = document.getElementById('responseDisplay');
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerText = `input: ${userInput}`;
            chatContainer.appendChild(userMessage);

            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.innerText = `reply: ${data.reply}`;
            chatContainer.appendChild(botMessage);

            chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
        } else {
            console.error('Error from server:', response.statusText);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
});