
class Animal{
    constructor(name){
        this.name = name;
    }
    makeSound(){
        let sound = `${this.name} : 아무소리나냄`;
        console.log(sound);
        return sound;
    }
}
module.exports = Animal;