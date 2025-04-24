import {Router} from 'express';
import {root} from '../1.utils/path.js';

const router = Router();

router.get('/',(req,res)=>{
    res.sendFile(root('public','posts','post-list.html'));
});

router.get('/:id',(req,res)=>{
    res.sendFile(root('public','posts','post-detail.html'));
});

export default router;