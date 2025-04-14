const fs = require('fs');

function myCallBack(err, data) {

}

// //파일 시스템을 사용할 때, 언제나 인코딩을 주의.
// fs.readFile('example.txt','utf8',myCallBack);


// function myCallBack(err,data){
//     if(err){
//         console.log('에러가 있음, 에러는 ',err);
//     }else{
//         console.log('에러가 없음, 데이터는 ',data);
//     }
// }

console.log('파일 읽기 전');

//파일 시스템을 사용할 때, 언제나 인코딩을 주의.
const data = fs.readFileSync('example.txt', 'utf8');
console.log('에러가 없음, 데이터는 ', data);
console.log('파일 읽은 후');
