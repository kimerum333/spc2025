import db from './db.js';

export function insertImages({ postId, imageUrlArray }) {
  const query = `
    INSERT OR IGNORE INTO post_images (post_id, image_url)
    VALUES (?, ?)
  `;

  const promises = imageUrlArray.map((imageUrl) => {
    return new Promise((resolve, reject) => {
      db.run(query, [postId, imageUrl], (err) => {
        if (err) {
          console.error(`이미지 삽입 실패: ${imageUrl}`, err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });

  return Promise.all(promises); // ✅ 모든 삽입이 완료된 후 resolve됨
}

  export function getPostImages({ postId }) {
    const query = `
      SELECT image_url FROM post_images
      WHERE post_id = ?
    `;
  
    return new Promise((resolve, reject) => {
      db.all(query, [postId], (err, rows) => {
        if (err) {
          console.error(`이미지 목록 조회 실패: ${postId}`, err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  export function deletePostImages({ postId, imageUrlArray }) {
    const query = `
      DELETE FROM post_images
      WHERE post_id = ? AND image_url = ?
    `;
  
    imageUrlArray.forEach((imageUrl) => {
      db.run(query, [postId, imageUrl], (err) => {
        if (err) {
          console.error(`이미지 삭제 실패: ${imageUrl}`, err.message);
        }
      });
    });
  }