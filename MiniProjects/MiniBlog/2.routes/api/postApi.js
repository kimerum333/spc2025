import { Router } from 'express';
import { writePost,getPostList, getSinglePost, editPost, removePost } from '../../3.controllers/postController.js';

const router = Router();

router.post('/', writePost);


router.get('/lists', getPostList);


router.get('/:id', getSinglePost);

router.put('/:id', editPost);

router.delete('/:id', removePost);




export default router;