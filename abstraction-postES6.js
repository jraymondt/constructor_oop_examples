class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log("Generic animal sound");
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  makeSound() {
    console.log("Meow");
  }
}

// Creating instances
const genericAnimal = new Animal("Generic");
const fluffy = new Cat("Fluffy");

genericAnimal.makeSound(); // Outputs: "Generic animal sound"
fluffy.makeSound(); // Outputs: "Meow"