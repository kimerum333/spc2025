class Circle{
    // #을 붙이면 프라이빗 변수가 된다.
    #radius;

    constructor(radius){
        this.#radius = radius;
    }

    // 게터 / 세터 문법 : 자바에서의 그것. 단, 일반 프로퍼티에 접근하듯이 접근하면 알아서 게터세터가 호출이 되는 식으로 사용.
    get diameter(){
        return this.#radius*2;
    }
    set diameter(diameter){
        this.#radius = diameter/2;
    }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter);

myCircle.diameter = 14;
console.log(myCircle.diameter);