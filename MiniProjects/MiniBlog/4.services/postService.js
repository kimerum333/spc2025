import { insertPost, selectSinglePost, selectPagedPosts, updatePost, deletePost } from "../5.repositories/postRepository.js";

export function writePostService({ title, content, thumbnailUrl ,authorId }) {
    console.log('서비스단에서 다룰 썸네일 주소',thumbnailUrl);
    return insertPost({ title, content, authorId });
}

export function getPostListService({offset, limit}) {
    console.log('at service',offset,limit);
    return selectPagedPosts({offset, limit});
}

export function getSinglePostService(postId) {
    return selectSinglePost(postId);
}

export function updatePostService({ id, title, content, authorId }) {
    return updatePost({ id, title, content, authorId });
}

export function removePostService({ postId, userId }) {
    return deletePost({ postId, userId });
}