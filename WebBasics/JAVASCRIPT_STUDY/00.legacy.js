

//Object : 객체
var person = {
    name:'john',
    age:25
}


//객체에는 메소드도 존재.
var person = {
    name:'john',
    age:25,
    greet:function(){console.log("안녕하세요. 저는"+this.name+"입니다.")},
    greetArrow:()=>console.log("안녕하세요. 저는"+this.name+"입니다.")
}

//객체 맴버에는 ["맴버변수명"] 으로도 접근가능.
console.log(person["name"]);

///자료구조
//배열
var fruits = ["사과","딸기","오렌지"];

console.log(fruits[0]);

//자바스크립트의 배열은 스택처럼 작동한다.
fruits.push("신선한 새 사과");
fruits.pop()


// 이퀄 세개로 비교하기 ===
//비교 (값)
number == 3;

//비교(값 / 타입)
number === 3;