const Animal = require('./Animal'); //

class Cat extends Animal{ //이걸 상속(inheritance)라고 부른다.
    makeSound(){
        let sound = `${this.name} : 미야옹`;
        console.log(sound);
        return sound;
    }
}

module.exports = Cat;