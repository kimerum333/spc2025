import { insertPost, selectSinglePost, selectPagedPosts, updatePost, deletePost } from "../5.repositories/postRepository.js";

export function writePostService({ title, content, authorId }) {
    return insertPost({ title, content, authorId });
}

export function getPostListService({offset, limit}) {
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