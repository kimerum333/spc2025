const string = "42"; //숫자 42가 아니라 글자 42;
console.log(string + 2);

const number = parseInt(string,10);
console.log(number + 2);

console.log(typeof string) ;
console.log(typeof number) ; 

const number2 = Number(string);
console.log(typeof number2) ; 

const user = {
    name:'jack',
    age:30,
}

console.log(typeof user);

//셋타임아웃도 내장함수.
setTimeout(()=>{
    console.log('1초 후 출력예정')
},1000);

console.log('끝');