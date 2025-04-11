class Animal{
    constructor(name){
        this.name = name;
    }
    makeSound(){
        let sound = '아무소리나냄';
        console.log(sound);
        return sound;
    }
}

class Dog extends Animal{ //이걸 상속(inheritance)라고 부른다.
    makeSound(){
        let sound = '멍멍';
        console.log(sound);
        return sound;
    }
}

class Cat extends Animal{ //이걸 상속(inheritance)라고 부른다.
    makeSound(){
        let sound = '멍멍';
        console.log(sound);
        return sound;
    }
}

let dolly = new Animal('dolly');
console.log(dolly.name);
dolly.makeSound();

let pup = new Dog('pup');
console.log(pup.name);
pup.makeSound();

let kitty = new Dog('kitty');
console.log(pup.name);
pup.makeSound();