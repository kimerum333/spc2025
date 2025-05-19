document.getElementById('codeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const code = document.getElementById('code').value;

    const response = await fetch('http://127.0.0.1:5000/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });

    const result = await response.text();
    document.getElementById('result').textContent = result;
});