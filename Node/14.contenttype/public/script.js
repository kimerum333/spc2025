console.log('스크립트 로드됨');

document.getElementById('sendJsonBtn').addEventListener('click', async ()=>{
    const data = document.getElementById('jsonInput').value;

    const res = await fetch('/submit-json',{
        method:'POST',
        headers:{"Content-Type" : "application/json"},
        body: data
    });
    let json = await res.json();

    document.getElementById('output').innerHTML=`
    <p><strong>바디: </strong> ${json.message}</p>
    `;
})


document.getElementById('sendFormBtn').addEventListener('click', async (e)=>{
    e.preventDefault();

    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    //form
    const queryString = new URLSearchParams(formData).toString();

    //json
    const formObj = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(formObj);


    const res = await fetch('/submit-form',{
        method:'POST',
        headers:{"Content-Type" : "application/x-www-form-urlencoded"},
        body: queryString
    });
    let json = await res.json();


    document.getElementById('output').innerHTML=`
    <p><strong>바디: </strong> ${JSON.stringify(json)}</p>
    `;
})

//여기에 평문 주고받기 예제를 만들자
document.getElementById('sendPlainTextBtn').addEventListener('click', async (e)=>{
    e.preventDefault();

    const text = document.getElementById('plainTextInput').value;
    const res = await fetch('/submit-text',{
        method:'POST',
        headers:{"Content-Type" : "text/plain"},
        body: text
    });
    let json = await res.json();


    document.getElementById('output').innerHTML=`
    <p><strong>바디: </strong> ${JSON.stringify(json)}</p>
    `;
})