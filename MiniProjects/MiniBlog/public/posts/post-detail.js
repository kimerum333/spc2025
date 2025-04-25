import { Post } from './Post.js';

//상수
const MODE = {
    READ: 'read',
    EDIT: 'edit',
    WRITE: 'write'
}

//전역변수
let mode = MODE.READ;


//유틸함수
function getPostIdFromURL() {
    const urlParts = window.location.pathname.split('/');
    return urlParts[urlParts.length - 1]; // ex: "/posts/0" → "0"
}

//렌더링 함수
function applyModeRendering(currentMode = mode) {
    const sections = document.querySelectorAll('[data-mode]');
    sections.forEach(section => {
        const modes = section.dataset.mode.split(' ');
        section.classList.toggle('hidden', !modes.includes(currentMode));
    });
}


//통신 함수
function writeOrEditPost() {
    function writePost(){
        const title = document.getElementById('edit-title').value;
        const content = document.getElementById('edit-content').value;
        const authorId = 1; //TODO 유저 만들어지기 전까진 하드코딩
        const post = new Post({ title, content, authorId });
    
        console.log(post.toJSON());
    
        axios.post('/api/posts',post.toJSON())
        .then((response)=>{
            const postId = response.data.postId;
            window.location.href = `/posts/${postId}`;
        })
        .catch((err)=>console.log(err));    
    }
    function updatePost(postId){
        console.log(postId);
        const title = document.getElementById('edit-title').value;
        const content = document.getElementById('edit-content').value;
        const authorId = 1; //TODO 유저 만들어지기 전까진 하드코딩
        const post = new Post({ title, content, authorId });
    
        console.log(post.toJSON());
    
        axios.put(`/api/posts/${postId}`,post.toJSON())
        .then((response)=>{
            const postId = response.data.postId;
            console.log(response.data);
            window.location.href = `/posts/${postId}`;
        })
        .catch((err)=>console.log(err));    
    }
    const postId = getPostIdFromURL();
    if(postId == 0){ writePost() }
    else { updatePost(postId) }
}
function readPost(){
    const postId = getPostIdFromURL();
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');

    axios.get(`/api/posts/${postId}`)
    .then( (response)=>{
        console.log(response.data);
        readTitle.innerText = response.data.title;
        readContent.innerText = response.data.content;
    })
    .catch((err)=>{
        console.log(err);
    })
}
function editPost(){
    const postId = getPostIdFromURL();
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');

    const editTitle = document.getElementById('edit-title');
    const editContent = document.getElementById('edit-content');

    editTitle.value = readTitle.innerText;
    editContent.value = readContent.innerText;

    mode = MODE.EDIT;
    applyModeRendering(mode);
}

function cancelEdit(){
    if(getPostIdFromURL()==0){
        return;
    }
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');

    const editTitle = document.getElementById('edit-title');
    const editContent = document.getElementById('edit-content');

    editTitle.value = readTitle.innerText;
    editContent.value = readContent.innerText;

    mode = MODE.READ;
    applyModeRendering(mode);
}

function deletePost(){
    let postId = getPostIdFromURL();
    axios.delete(`/api/posts/${postId}`)
    .then((response)=>{
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

//초기화 함수
function init() {
    let postId = getPostIdFromURL();
    if (postId === '0') {
        mode = MODE.WRITE;
        applyModeRendering(mode);
    } else {
        mode = MODE.READ;
        applyModeRendering(mode);
        readPost(postId);
    }

    const postButton = document.getElementById('edit-post-button').addEventListener('click', writeOrEditPost);
    const editButton = document.getElementById('read-edit-button').addEventListener('click', editPost);
    const cancelButton = document.getElementById('edit-cancel-button').addEventListener('click', cancelEdit);
    const deleteButton = document.getElementById('read-delete-button').addEventListener('click', deletePost);
}


document.addEventListener('DOMContentLoaded', () => {
    init();
});

