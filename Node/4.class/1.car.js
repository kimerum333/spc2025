class Car{

    name = 'mycar';

    constructor (make, model){ //초기화용 함수
        this.make = make;
        this.model = model;
    }

    drive(){
        return `${this.make} ${this.model} is driving`;
    }
}

const mycar = new Car('hyundai','k5');
console.log(mycar.drive());

console.log(typeof mycar);
console.log(mycar instanceof Car);
console.log(mycar instanceof Error);
console.log(mycar instanceof Object);

const mytruck = new Car('tesla','cybertruck');
console.log(mytruck.drive());
