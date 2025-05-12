const fs = require('fs');

// 버전1 셀맵 불러오기
const originalMap = JSON.parse(fs.readFileSync('data/cell-map.json', 'utf-8'));
const newMap = {};

// 주소 변환 함수: 숫자만 -2
function shiftCellAddress(cell, offset = -2) {
  const match = cell.match(/^([A-Z]+)(\d+)$/);
  if (!match) return cell; // 형식이 다르면 그대로 반환

  const [, col, row] = match;
  const newRow = Math.max(1, parseInt(row, 10) + offset); // 음수 방지
  return `${col}${newRow}`;
}

// 변환 적용
for (const [key, addr] of Object.entries(originalMap)) {
  newMap[key] = shiftCellAddress(addr);
}

// 저장
fs.writeFileSync('data/cell-map-v2.json', JSON.stringify(newMap, null, 2), 'utf-8');
console.log('✅ cell-map-v2.json 파일이 생성되었습니다.');
