# what is this bullshit all about

## abstraction.js

This snippet shows classical inheritance in pre-ES6 JavaScript using constructor functions and prototypes. The Animal constructor initializes an instance property (name) on each created object. Its behavior is shared via Animal.prototype.makeSound, so all Animal instances reuse a single function rather than duplicating it per instance.

Cat is a subtype of Animal. Inside Cat, Animal.call(this, name) runs the Animal constructor in the context of the new Cat, ensuring Cat instances get their own name property. Method sharing comes from the prototype chain: Cat.prototype = Object.create(Animal.prototype) sets Cat’s prototype to an object linked to Animal.prototype, so Cat instances inherit Animal’s methods.

Cat then overrides makeSound by defining its own method on Cat.prototype. When calling makeSound, JavaScript looks up the method on the instance, then Cat.prototype, then Animal.prototype; fluffy uses the overridden "Meow", while genericAnimal uses the parent’s "Generic animal sound". This is basic polymorphism: the same method name yields behavior appropriate to the actual type.

Gotchas and tips:

After Cat.prototype = Object.create(Animal.prototype), the constructor property points to Animal; set Cat.prototype.constructor = Cat if code relies on it (e.g., for reflection or instance tagging).
Always assign the prototype before adding child methods; reassigning the prototype later would discard previously added methods.
Avoid Cat.prototype = Animal.prototype; it would make both types share the same prototype object.
Prefer methods on prototypes over defining them inside constructors to avoid per-instance duplication.
Modern code can express the same pattern more readably with ES6 class and extends.

