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

## encapsulation.js

This snippet uses a constructor function to model an Animal with a public property (name) and a method (sayName). When you call new Animal("Fluffy"), the constructor assigns the name to the instance (this.name) and defines sayName directly on that instance. Each instance therefore carries its own copy of sayName, which logs “My name is …” using the instance’s current name.

The usage shows encapsulation in the sense that data and behavior live together on the object. The calling code doesn’t need to know how sayName is implemented—only that the object exposes a method to announce its name—illustrating abstraction. Creating cat and dog with different names produces independent objects that both support the same interface (sayName).

Gotchas and improvements:

Defining sayName inside the constructor creates a new function per instance; for many objects this is unnecessary memory churn. Prefer attaching it to Animal.prototype so all instances share one function.
Properties and methods here are public. If you need true privacy for name in older JavaScript, use a closure; in modern code, use class syntax with private fields (#name).
Ensure you always use new with the constructor; otherwise this may refer to the global object (or be undefined in strict mode), causing bugs.
If you store sayName in a variable and call it later, this can lose its binding; bind it or call via the object to keep the correct this.

## inheritance.js

This snippet models inheritance with constructor functions and prototypes. Shape is the parent constructor that initializes a color property on each instance. Circle is a child constructor that first calls Shape.call(this, color) to run the parent constructor in the context of the new Circle, ensuring Circle instances receive the color property. Circle then adds its own instance-specific radius.

The prototype chain is established with Circle.prototype = Object.create(Shape.prototype), which links Circle’s prototype to Shape’s prototype so Circle instances inherit any methods defined on Shape.prototype. A Circle-specific method, getArea, is added on Circle.prototype so it’s shared by all Circle instances and computes the area using Math.PI and Math.pow(this.radius, 2). The example creates a redCircle and demonstrates that it has both the inherited color and the Circle-specific behavior via getArea.

One small gotcha: after assigning Circle.prototype = Object.create(Shape.prototype), the constructor property on Circle.prototype points to Shape. If code relies on it, reset it with Circle.prototype.constructor = Circle. Also, for a micro-optimization, r * r is slightly faster than Math.pow(r, 2). Modern code can express the same pattern more readably with class and extends.

## polymorphism.js

same as abstraction.js
