import fs from 'fs/promises';
import path from 'path';

const TEMP_DIR = path.resolve('public/temp_uploads');
const UPLOAD_DIR = path.resolve('public/uploads/images');

export function moveTempToPermanentLazy(tempUrl) {
  const filename = path.basename(tempUrl);
  const tempPath = path.join(TEMP_DIR, filename);
  const finalPath = path.join(UPLOAD_DIR, filename);

  // 파일 이동은 비동기적으로 느긋하게 처리
  fs.rename(tempPath, finalPath)
    .then(() => console.log('파일 이동 성공:', filename))
    .catch(err => console.error('파일 이동 실패:', err));

  // 바로 새 파일 URL 반환
  return `/uploads/images/${filename}`;
}


export async function deletePermanentFile(url) {
  const filename = path.basename(url);
  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filePath);
    console.log('파일 삭제 성공:', filename);
  } catch (err) {
    console.error('파일 삭제 실패:', err);
    // 보통 실패해도 치명적이지 않게 처리 (ex: 파일이 없었을 수도 있음)
  }
}
