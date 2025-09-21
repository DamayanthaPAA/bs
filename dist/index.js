"use strict";
// Main entry point for the TypeScript project
console.log('Hello, TypeScript!');
// Example function with type annotations
function greet(name) {
    return `Hello, ${name}!`;
}
// Example class
class Calculator {
    add(a, b) {
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }
}
// Example usage
const calculator = new Calculator();
console.log(greet('World'));
console.log('2 + 3 =', calculator.add(2, 3));
console.log('5 - 2 =', calculator.subtract(5, 2));
//# sourceMappingURL=index.js.map