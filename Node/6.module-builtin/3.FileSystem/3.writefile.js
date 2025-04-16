const fs = require('fs');

console.log('파일 쓰기 전');

const data = '쓸 내용';

fs.writeFile('example.txt',data,{encoding:'utf8'},(err)=>{
    if(err){
        console.log('에러가 있음, 에러는 ',err);
    }else{
        console.log('에러가 없음, 쓰기 완료.');
    }
});

console.log('파일 쓴 후');
