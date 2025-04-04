//js 는 변수에 함수 할당이 가능하다.
//C언어에서 온 문법.
const add = function(a,b){
    return a+b;
}
console.log(add(2,3));

//Arrow Function
const sum = (a,b)=> a+b;
console.log(sum(2,3));

///자료구조
//배열
var fruits = ["사과","딸기","오렌지"];

//클래식한 익명함수
fruits.forEach(function(number){
    console.log(number);
})

//화살표함수 여러줄짜리
fruits.forEach((number)=>{
    console.log(number)
});

//화살표함수 한줄짜리
fruits.forEach((number)=>console.log(number));