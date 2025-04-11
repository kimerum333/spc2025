const Animal = require('./Animal'); //


class Dog extends Animal{ //이걸 상속(inheritance)라고 부른다.
    makeSound(){
        let sound = `${this.name} : 멍멍`;
        console.log(sound);
        return sound;
    }
}

module.exports = Dog;