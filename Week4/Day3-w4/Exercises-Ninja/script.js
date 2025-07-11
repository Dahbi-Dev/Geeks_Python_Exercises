class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();

/*
Output:
I'm pink. 🌸
I'm a bird. 🦢

Explanation:
- When creating a new Flamingo, its constructor runs first.
- It logs “I'm pink. 🌸” before calling `super()`.
- `super()` calls the parent Bird constructor, which logs “I'm a bird. 🦢”.
- So we get two messages, in order.
*/
