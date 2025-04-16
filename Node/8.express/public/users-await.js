
//최초 페이지 로드시
updateTable();

async function updateUser(id) {
    const div = document.querySelector(`.user-${id}`);
    //    const input = div.querySelector('.user-name');
    const input = prompt('이름을 뭘로 바꿀래요?');

    const name = input.trim();
    if (name == '') {
        return;
    }
    try{
        await fetch('/users', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name })
        })
        updateTable();    
    }catch(err){
        alert('알 수 없는 예외 발생!');
    }
}

async function deleteUser(id) {

    const confirmDel = confirm('정말로 삭제하시겠습니까?');
    if (!confirmDel) {
        return;
    }
    await fetch(`/users/${id}`, {
        method: 'DELETE'
    }).then(updateTable);
}


class User {
    constructor(id, name, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
    makeComponent() {
        const format = (ms) => new Date(ms).toLocaleString();
        return `
            <span class="user-id">ID: ${this.id}</span>
            <input class="user-name" type="text" value="${this.name}">
            <span class="user-createdAt">등록시각: ${format(this.createdAt)}</span>
            <span class="user-updatedAt">최종수정시각: ${format(this.updatedAt)}</span>
            <button onclick="updateUser(${this.id})">수정</button>
            <button onclick="deleteUser(${this.id})">삭제</button>
        `;
    }
}


//함수 안에 await 가 있으면 그 함수는 async 함수가 된다. 반드시 명시 필요!
async function updateTable() {
    const result = await fetch('/users', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });
    const users = await result.json();
    printTable(users);

    function printTable(data) {
        userTable.innerHTML = '';
        //console.log(data);
        for (index in data) {
            let target = data[index];
            const elem = new User(
                data[index].id,
                data[index].name,
                data[index].createdAt,
                data[index].updatedAt
            )
                .makeComponent();
            const div = document.createElement('div');
            div.classList.add(`user-${data[index].id}`);
            div.innerHTML = elem;
            userTable.appendChild(div);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const name = document.getElementById('username');
    const userTable = document.getElementById('userTable');



    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = username.value;

        console.log('생성할 이름, ', name)
        await fetch('/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
            .then(() => {
                //입력칸 클리어
                username.value = '';
                //서버에 요청해 그리기
                updateTable();
            })

    })




})