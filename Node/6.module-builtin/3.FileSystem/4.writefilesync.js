const fs = require('fs');

console.log('파일 쓰기 전');

const data = '라이트파일싱크';

fs.writeFileSync('example.txt',data,{encoding:'utf8'});

console.log('파일 쓴 후');
