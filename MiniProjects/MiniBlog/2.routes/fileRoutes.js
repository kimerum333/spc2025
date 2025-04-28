import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// temp_uploads 폴더
const tempUploadDir = path.resolve('public/temp_uploads');
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempUploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });



// 썸네일 업로드 라우터
router.post('/upload-thumbnail', upload.single('thumbnail'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '파일 없음' });
  const url = `/temp_uploads/${req.file.filename}`;
  res.json({ url });
});

router.post('/upload-post-image', upload.single('postImage'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '파일 없음' });
  const url = `/temp_uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
