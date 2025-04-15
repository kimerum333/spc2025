const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('유저 목록'));
router.post('/', (req, res) => res.send('유저 생성'));
router.get('/:id', (req, res) => res.send(`유저 ID: ${req.params.id}`));

module.exports = router;