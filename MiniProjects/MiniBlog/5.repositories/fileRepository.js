import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// 업로드 경로
// 리눅스 시스템 기준, /public 으로 넣으면 프로젝트 루트가 아니라 시스템 루트로부터 찾으니 오류.
const uploadDir = path.resolve('public/uploads/images');

// Multer 저장 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// 파일 필터 설정 (확장자 제한)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.png', '.jpg', '.jpeg', '.gif'];

  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true); // 허용
  } else {
    cb(new Error('허용되지 않은 파일 형식입니다.'), false); // 차단
  }
};

// Multer 업로더 생성
const uploader = multer({
  storage,
  fileFilter
});

/**
 * 싱글 파일 업로드 미들웨어
 */
export function uploadSingleFile(fieldName) {
  return uploader.single(fieldName);
}

/**
 * 파일 삭제 함수
 */
export async function deleteFile(filename) {
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.unlink(filePath);
    console.log('파일 삭제 성공:', filename);
  } catch (err) {
    console.error('파일 삭제 실패:', err);
    throw err;
  }
}
