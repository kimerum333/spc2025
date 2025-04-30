import { insertPost, selectSinglePost, selectPagedPosts, updatePost, deletePost, updatePostWithNewThumbnail } from "../5.repositories/postRepository.js";
import { moveTempToPermanentLazy } from "../1.modules/fileSaver.js";
import { extractImageSrcs } from "../1.modules/imageSrcManager.js";

//
const PLACEHOLDER_THUMBNAIL_URL = '/uploads/images/300x180.png';

export function writePostService({ title, content, thumbnailUrl ,authorId }) {
    //console.log('서비스단에서 다룰 썸네일 주소',thumbnailUrl);
    thumbnailUrl = (thumbnailUrl) ? moveTempToPermanentLazy(thumbnailUrl) : PLACEHOLDER_THUMBNAIL_URL;
    let contentImages = extractImageSrcs

    return insertPost({ title, content, thumbnailUrl, authorId });
}

export function getPostListService({offset, limit}) {
    return selectPagedPosts({offset, limit});
}

export function getSinglePostService(postId) {
    return selectSinglePost(postId);
}

export function updatePostService({ id, title, content, thumbnailUrl, authorId }) {    
    if(thumbnailUrl){
        thumbnailUrl = moveTempToPermanentLazy(thumbnailUrl);
        return updatePostWithNewThumbnail({ id, title, content, thumbnailUrl,authorId });
    }
    return updatePost({ id, title, content, authorId });
}

export function removePostService({ postId, userId }) {
    return deletePost({ postId, userId });
}