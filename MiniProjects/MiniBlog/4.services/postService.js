import { insertPost, selectSinglePost, selectPagedPosts, updatePost, deletePost } from "../5.repositories/postRepository.js";
import { moveTempToPermanentLazy, deletePostImagesFromFile } from "../1.modules/fileManager.js";
import { bulkReplaceTempImages, extractTempImageSrcs } from "../1.modules/imageSrcManager.js";
import { insertImages, getPostImages, deletePostImages as deletePostImagesFromDB } from "../5.repositories/postImageRepositories.js";

//
const PLACEHOLDER_THUMBNAIL_URL = '/essentials/300x180.png';

export function writePostService({ title, content, thumbnailUrl, authorId }) {

    let finalThumbnailUrl = thumbnailUrl ?
        moveTempToPermanentLazy(thumbnailUrl)
        : PLACEHOLDER_THUMBNAIL_URL;

    //content is a html styled string
    let tempImages = extractTempImageSrcs(content);
    let parmaImages = tempImages.map(innerImage => moveTempToPermanentLazy(innerImage));
    let mapping = Object.fromEntries(
        tempImages.map((src, idx) => [src, parmaImages[idx]])   
    );

    let changedHTML = bulkReplaceTempImages(content, mapping);
    let savingImages = [...parmaImages];
    if (thumbnailUrl) savingImages.push(finalThumbnailUrl);
    console.log('savingImages = ', savingImages);

    return insertPost({ title, content: changedHTML, thumbnailUrl: finalThumbnailUrl, authorId })
        .then((lastId) => {
            //백그라운드에서 비동기 이미지 저장
            insertImages({ postId: lastId, imageUrlArray: savingImages })
            //아이디는 바로 리턴해버림
            return lastId;
        });
}

export function getPostListService({ offset, limit }) {
    return selectPagedPosts({ offset, limit });
}

export function getSinglePostService(postId) {
    return selectSinglePost(postId);
}

export function updatePostService({ id, title, content, thumbnailUrl, authorId }) {

    //썸네일이 바뀌었다면 그것을 영구이미지로 변경한다.
    if (thumbnailUrl.includes('temp_uploads/')) {
        thumbnailUrl = moveTempToPermanentLazy(thumbnailUrl);
    }
    //임시이미지는 전부 영구화하고, 영구 이미지는 그대로.
    let tempImages = extractTempImageSrcs(content);
    let parmaImages = tempImages.map(innerImage => moveTempToPermanentLazy(innerImage));
    let mapping = Object.fromEntries(
        tempImages.map((src, idx) => [src, parmaImages[idx]])
    );
    let changedHTML = bulkReplaceTempImages(content, mapping);
    let allImagesInsideContent = [...parmaImages, thumbnailUrl];

    return updatePost({ id, title, thumbnailUrl, content: changedHTML, authorId })
        .then((rows) => {
            insertImages({ postId: id, imageUrlArray: allImagesInsideContent })
                .then(() => handleOrphanImages({ postId: id, newImagesUrl: allImagesInsideContent }));
            return rows;
        })
        .catch((err) => console.error(err));

    function handleOrphanImages({ postId, newImagesUrl }) {
        getPostImages({ postId })
            .then((existingImages) => {
                const existingUrls = existingImages.map(img => img.image_url);

                const orphanUrls = existingUrls.filter(
                    url => !newImagesUrl.includes(url)
                );

                if (orphanUrls.length === 0) return;
                console.log('first orhpan is ', orphanUrls[0]);

                deletePostImagesFromDB({ postId: id, imageUrlArray: orphanUrls });
                deletePostImagesFromFile(orphanUrls);
            })
            .catch((err) => {
                console.error('고아 이미지 처리 실패:', err.message);
            });
    }
}

export function removePostService({ postId, userId }) {
    return deletePost({ postId, userId });
}