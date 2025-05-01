import db from './db.js';



export function insertPost({ title, content, thumbnailUrl, authorId }) {

  console.log('at db', title, content, thumbnailUrl, authorId);

  const query = `
      INSERT INTO
        posts
        (title, content, thumbnail_url, author_id)
      VALUES
        (?, ?, ?, ?)
    `;

  return new Promise((resolve, reject) => {
    db.run(query, [title, content, thumbnailUrl, authorId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // insert된 row의 id
      }
    });
  });
}

export function selectSinglePost(postId) {
  console.log('at db', postId);
  const query = `
    SELECT
      title,
      content,
      thumbnail_url as thumbnailUrl
    FROM
      posts
    WHERE
      id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(query, [postId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}


export function updatePost({ id, title, content, thumbnailUrl, authorId }) {
  console.log('at db', id, title, content, thumbnailUrl, authorId);
  const query = `
    UPDATE posts
    SET
      title = ?,
      content = ?,
      thumbnail_url = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = ?
    AND
      author_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.run(query, [title, content, thumbnailUrl, id, authorId], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(this.changes); // 성공적으로 바뀐 행 수
      }
    });
  });
}

export function deletePost({ postId, userId }) {
  console.log('db', 'postId', postId, 'userId', userId);
  const query = `
    DELETE FROM posts
    WHERE id = ?
    AND author_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [postId, userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes); // 삭제된 행 수 반환
      }
    });
  });
}

export function selectPagedPosts({ offset, limit }) {
  const query = `
    SELECT 
      p.id,
      p.title,
      p.content,
      p.thumbnail_url as thumbnailUrl,
      (SELECT COUNT(*) FROM posts) AS totalCount
    FROM posts p
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [limit, offset], (err, rows) => {
      if (err) return reject(err);

      // totalCount는 각 row에 다 붙어있으므로, 첫 번째 것만 꺼내면 됨
      const totalCount = rows.length > 0 ? rows[0].totalCount : 0;
      const posts = rows.map(({ totalCount, ...rest }) => rest);

      resolve({
        posts,
        totalCount
      });
    });
  });
}
