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
function writePost() {
    const postId = getPostIdFromURL();
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const post = new Post({ id: postId, title, content });

    console.log(post.toJSON());

    axios.post('/api/posts',post.toJSON());
}

//초기화 함수
function init() {
    let postId = getPostIdFromURL();
    if (postId === '0') {
        mode = MODE.WRITE;
        applyModeRendering(mode);
    } else {
        mode = MODE.READ;
    }

    const postButton = document.getElementById('edit-post-button').addEventListener('click', writePost);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});

