
import { getPostListService, writePostService, getSinglePostService, updatePostService, removePostService } from '../4.services/postService.js';

export function writePost(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const authorId = 1;

  writePostService({ title, content, authorId })
    .then((postId) => {
      res.status(201).json({ postId });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
}

export function getPostList(req, res) {
  //console.log('route, lists', req.query.offset, req.query.limit);
  let offset = req.query.offset;
  let limit = req.query.limit;
  getPostListService(offset, limit)
    .then(({ posts, totalCount }) => {
      res.json({ posts, totalCount });
    })
    .catch((err) => {
      console.log(err);
    })
}

export function getSinglePost(req, res) {
  //console.log(req.params.id);

  getSinglePostService(req.params.id)
    .then((row) => {
      console.log(row);
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    })
}

export function editPost(req, res) {
  //console.log(req.params.id);
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const authorId = 1;

  //console.log('calling updatePost with:', { id, title, content, authorId });
  updatePostService({ id, title, content, authorId })
    .then((rows) => {
      if (rows == 1) {
        res.status(200).json({ "postId": req.params.id });
      } else {
        res.status(500).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
}

export function removePost(req, res) {
  const postId = req.params.id;
  const userId = 1;
  removePostService({ postId, userId })
    .then((rows) => {
      if (rows == 0) {
        res.status(400).end();
      } else {
        res.status(200).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    })
}
