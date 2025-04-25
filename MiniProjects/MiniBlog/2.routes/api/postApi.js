import { Router } from 'express';
import { insertPost, selectSinglePost, updatePost, deletePost } from '../../3.repositories/postRepository.js';

const router = Router();

router.post('/', (req, res) => {

    console.log('at route', req.body);
    const title = req.body.title;
    const content = req.body.content;
    const authorId = 1;

    insertPost({ title, content, authorId })
        .then((postId) => {
            res.status(201).json({ postId });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);

    selectSinglePost(req.params.id)
        .then((row) => {
            console.log(row);
            res.json(row);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).end();
        })
});

router.put('/:id', (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const authorId = 1;

    console.log('calling updatePost with:', { id, title, content, authorId });
    updatePost({ id, title, content, authorId })
        .then((rows) => {
            if (rows == 1) {
                console.log('can I reach?', req.params.id);
                res.status(200).json({ "postId": req.params.id });
            } else {
                res.status(500).end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
});

router.delete('/:id', (req, res) => {
    console.log('route, delete', req.params.id);
    const postId = req.params.id;
    const userId = 1;
    deletePost({ postId, userId })
        .then((rows)=>{
            if(rows==0){
                res.status(400).end();
            }else{
                res.status(200).end();
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).end();
        })
});

export default router;