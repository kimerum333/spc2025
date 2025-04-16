const os = require('os');

console.log(`호스트 이름 : ${os.hostname()}`);
console.log(`임시 폴더 경로 : ${os.tmpdir()}`);
console.log(`씨퓨 정보 : ${os.cpus()[0]}`);
console.log(`씨퓨 정보 : ${os.totalmem()}`);
