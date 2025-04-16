class User{
    constructor(id,name,createdAt,updatedAt){
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
    makeComponent(){
        return `
            <div class="user-${this.id}">
                <span class="user-id">ID: ${this.id}</span>
                <input class="user-name" type="text" value="${this.name}">
                <span class="user-createdAt">등록시각: ${Date(this.createdAt)}</span>
                <span class="user-updatedAt">최종수정시각: ${Date(this.updatedAt)}</span>
                <button onclick="updateUser(${this.id})">수정</button>
                <button onclick="deleteUser(${this.id})">삭제</button>
            </div>
        `;
    }
}
function updateUser(id){
    const name = document.querySelector('')
}