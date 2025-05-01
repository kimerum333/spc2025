import { Post } from './Post.js';

//상수
const MODE = {
    READ: 'read',
    EDIT: 'edit',
    WRITE: 'write'
}

//전역변수
let mode = MODE.READ;
let quill = null;


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
function createOrUpdatePost() {
    function createPost() {
        const title = document.getElementById('edit-title').value;
        const content = quill.root.innerHTML;
        const thumbnailUrl = document.getElementById('hidden-thumbnail-url').value;

        const authorId = 1; //TODO 유저 만들어지기 전까진 하드코딩
        const post = new Post({ title, content, thumbnailUrl, authorId });

        //console.log(post.toJSON());

        axios.post('/api/posts', post.toJSON())
            .then((response) => {
                const postId = response.data.postId;
                window.location.href = `/posts`;
            })
            .catch((err) => console.log(err));
    }
    function updatePost(postId) {
        console.log(postId);
        const title = document.getElementById('edit-title').value;
        //const content = document.getElementById('edit-content').value;
        const content = quill.root.innerHTML;

        const thumbnailUrl = document.getElementById('hidden-thumbnail-url').value;

        const authorId = 1; //TODO 유저 만들어지기 전까진 하드코딩
        const post = new Post({ title, content, thumbnailUrl, authorId });

        console.log(post.toJSON());

        axios.put(`/api/posts/${postId}`, post.toJSON())
            .then((response) => {
                const postId = response.data.postId;
                console.log(response.data);
                window.location.href = `/posts/${postId}`;
            })
            .catch((err) => console.log(err));
    }
    const postId = getPostIdFromURL();
    if (postId == 0) { createPost() }
    else { updatePost(postId) }
}

function getPost() {
    const postId = getPostIdFromURL();
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');
    const thumbnailPreview = document.getElementById('thumbnail-preview');
    const hiddenInput = document.getElementById('hidden-thumbnail-url');

    axios.get(`/api/posts/${postId}`)
        .then((response) => {
            console.log(response.data);
            readTitle.innerText = response.data.title;
            readContent.innerHTML = response.data.content;
            thumbnailPreview.src = response.data.thumbnailUrl;
            hiddenInput.value = response.data.thumbnailUrl;
        })
        .catch((err) => {
            console.log(err);
        })
}

function editPost() {
    //TODO changedThumbnailURL 요청 필요.
    const postId = getPostIdFromURL();
    const readTitle = document.getElementById('read-title');
    const readContent = document.getElementById('read-content');

    const editTitle = document.getElementById('edit-title');
    // const editContent = document.getElementById('edit-content');
    const editContent = quill;

    editTitle.value = readTitle.innerText;
    editContent.clipboard.dangerouslyPasteHTML(0, readContent.innerHTML);

    mode = MODE.EDIT;
    applyModeRendering(mode);
}

function cancelEdit() {
    if (getPostIdFromURL() == 0) {
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

function deletePost() {
    let postId = getPostIdFromURL();
    axios.delete(`/api/posts/${postId}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

function initQuill(editorSelector) {
    console.log('init quill');
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }]                                         // remove formatting button
    ];

    quill = new Quill(editorSelector, {
        theme: 'snow',
        modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: quillImageHandler
                }
            }
        }
    });
}

function quillImageHandler(){
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('postImage', file);

        try {
            const res = await axios.post('/files/upload-post-image', formData);
            const imageUrl = res.data.url;

            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
            console.log('이미지 업로드 성공');
            console.log('퀼 안쪽 내용',quill.root.innerHTML);
        } catch (err) {
            console.error('이미지 업로드 실패', err);
        }
    };
}



function uploadThumbnail(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('파일을 선택해주세요.');
        return;
    }

    const formData = new FormData();
    formData.append('thumbnail', file);

    axios.post('/files/upload-thumbnail', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            let uploadedUrl = response.data.url;

            const hiddenInput = document.getElementById('hidden-thumbnail-url');
            hiddenInput.value = uploadedUrl;

            const thumbnailPreview = document.getElementById('thumbnail-preview');
            thumbnailPreview.src = uploadedUrl;
        })
        .catch((error) => {
            console.log(error);
        });
}

//초기화 함수
function init() {
    initQuill('#edit-content')
    let postId = getPostIdFromURL();
    if (postId === '0') {
        mode = MODE.WRITE;
        applyModeRendering(mode);
    } else {
        mode = MODE.READ;
        applyModeRendering(mode);
        getPost(postId);
    }

    const postButton = document.getElementById('edit-post-button').addEventListener('click', createOrUpdatePost);
    const editButton = document.getElementById('read-edit-button').addEventListener('click', editPost);
    const cancelButton = document.getElementById('edit-cancel-button').addEventListener('click', cancelEdit);
    const deleteButton = document.getElementById('read-delete-button').addEventListener('click', deletePost);
    const uploadThumbnailInput = document.getElementById('upload-thumbnail-image').addEventListener('change', uploadThumbnail);
}


document.addEventListener('DOMContentLoaded', () => {
    init();
});

