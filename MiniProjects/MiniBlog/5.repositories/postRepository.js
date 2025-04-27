import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('blog.db');

export function insertPost({ title, content, authorId }) {

  console.log('at db', title, content, authorId);
  const query = `
      INSERT INTO
        posts
        (title, content, author_id)
      VALUES
        (?, ?, ?)
    `;

  return new Promise((resolve, reject) => {
    db.run(query, [title, content, authorId], function (err) {
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
      title, content
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

export function updatePost({ id, title, content, authorId }) {
  console.log('at db', id, title, content, authorId);
  const query = `
    UPDATE posts
    SET
      title = ?,
      content = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE
      id = ?
    AND
      author_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.run(query, [title, content, id, authorId], function (err) {
      if (err) {
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

export function selectPagedPosts({offset, page}) {
  const query = `
    SELECT 
      p.*, 
      (SELECT COUNT(*) FROM posts) AS totalCount
    FROM posts p
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [page, offset], (err, rows) => {
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
