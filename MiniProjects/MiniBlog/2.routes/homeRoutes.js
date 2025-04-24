import { Router } from 'express';
import {root} from '../1.utils/path.js'

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(root('public','index.html'));
});

export default router;