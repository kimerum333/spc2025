//1. 저 영역 클릭해서 창이 나오게 한다.
//2. x 눌러서 창이 닫히게 한다.

function printChatbot({ message, sender = 'user' }) {
    const messageArea = document.getElementById('chatbot-messages');
    const div = document.createElement('div');

    if (sender === 'user') {
        div.classList.add('mine');
        div.innerText = "나 : " + message;
    } else {
        div.classList.add('echo');
        div.innerText = "에코 : " + message;
    }
    messageArea.appendChild(div);
}

//3. 백엔드로 입력내용을 보낸다.
document.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('chatbotIcon');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMessege = document.getElementById('sendMessege');

    icon.addEventListener('click', () => {
        icon.style.display = 'none';
        chatbotWindow.style.display = 'flex';
    });

    closeChatbot.addEventListener('click', () => {
        icon.style.display = 'flex';
        chatbotWindow.style.display = 'none';
    });

    sendMessege.addEventListener('click', sendMessage);
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const input = document.getElementById('chatbotInput');
        const question = { question: input.value };

        printChatbot({ message: input.value, sender: 'user' });

        try {
            let answer = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(question)
            });
            let json = await answer.json();
            printChatbot({ message: json.answer, sender: 'bot' });

        } catch (err) {
            printChatbot('알 수 없는 오류입니다.', true);
        }
        //console.log(json);

        input.value = '';
    }
})