// 1. Function Type Expressions
let calculate: (a: number, b: number) => number;
calculate = (a, b) => {
return a + b;
};
console.log("Function Type:", calculate(10, 20));

// 2. Function Type Aliases
type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const multiply: Operation = (a, b) => a * b;
console.log("Addition:", add(10, 5));
console.log("Multiplication:", multiply(10, 5));

// 3. Optional Parameters
function displayUser(name: string, age?: number): void {
console.log("Name:", name);
if (age !== undefined) {
    console.log("Age:", age);
}
}
displayUser("Aditya", 21);
displayUser("Rahul");

// 4. Default Parameters
function greet(name: string = "Guest"): string {
return `Hello, ${name}`;
}
console.log(greet("Aditya"));
console.log(greet());

// 5. Rest Parameters
function calculateTotal(...prices: number[]): number {
let total = 0;

for (const price of prices) {
    total += price;
}

return total;
}
console.log("Total:", calculateTotal(100, 200, 300));

// 6. Object Parameters
interface Product {
id: number;
name: string;
price: number;
quantity: number;
}
function calculateProductTotal(product: Product): number {
return product.price * product.quantity;
}
const laptop: Product = {
id: 101,
name: "Laptop",
price: 45000,
quantity: 2
};
console.log("Product Total:",calculateProductTotal(laptop));

// 7. Function Overloading
function formatValue(value: string): string;
function formatValue(value: number): string;
function formatValue(value: string | number): string {
if (typeof value === "string") {
    return value.toUpperCase();
}
return value.toFixed(2);
}
console.log("Formatted String:", formatValue("typescript"));
console.log("Formatted Number:", formatValue(25));

// 8. Add Function Overloading
function addValues(a: number, b: number): number;
function addValues(a: string, b: string): string;
function addValues(a: number | string,b: number | string): number | string {
if (typeof a === "number" && typeof b === "number") {
    return a + b;
}
if (typeof a === "string" && typeof b === "string") {
    return a + b;
}
throw new Error("Both arguments must have the same type");
}
console.log("Number Addition:", addValues(10, 20));
console.log("String Addition:", addValues("Hello ", "TypeScript"));

// 9. Callback Functions
function processUser(name: string,callback: (message: string) => void): void {
const message = `Welcome ${name}`;
callback(message);
}
processUser("Aditya", (message) => {
console.log(message);
});

// 10. Higher-Order Functions
function operate(a: number,b: number,operation: (x: number, y: number) => number): number {
return operation(a, b);
}
const operationResult = operate(10, 5, (x, y) => x + y);
console.log("Operation Result:", operationResult);

// Array methods with callbacks
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log("Doubled:", doubled);
console.log("Even Numbers:", evenNumbers);

// 11. Functions Returning Functions
function createGreeting(greeting: string): (name: string) => string {
return function (name: string): string {
    return `${greeting}, ${name}`;
};
}
const sayHello = createGreeting("Hello");
console.log(sayHello("Aditya"));

// Arrow Function Returning a Function
function createMultiplier(multiplier: number): (value: number) => number {
return (value) => value * multiplier;
}
const double = createMultiplier(2);
console.log("Double:", double(10));

// 12. The this Parameter
interface User {
name: string;
greet(this: User): string;
}
const user: User = {
name: "Aditya",
greet: function (this: User): string {
    return `Hello, ${this.name}`;
}
};
console.log(user.greet());

// 13. Never Return Type
function throwError(message: string): never {
throw new Error(message);
}
// Uncomment to test the error:
// throwError("Something went wrong");

// 14. E-Commerce Practical Example
type DiscountFunction = (price: number) => number;
function calculateShoppingTotal(...prices: number[]): number {
return prices.reduce((total, price) => total + price, 0);
}

function applyDiscount(total: number,discount: DiscountFunction): number {
return discount(total);
}
function displayProduct(product: Product): void {
console.log("\nProduct:", product.name);
console.log("Price:", product.price);
console.log("Quantity:", product.quantity);
console.log("Total:",product.price * product.quantity);
}
function createDiscount(percentage: number): DiscountFunction {
return (price) => {
    return price - (price * percentage / 100);
};
}
const product1: Product = {
id: 201,
name: "Laptop",
price: 45000,
quantity: 1
};
const product2: Product = {
id: 202,
name: "Mouse",
price: 800,
quantity: 2
};
displayProduct(product1);
displayProduct(product2);
const shoppingTotal = calculateShoppingTotal(
product1.price * product1.quantity,
product2.price * product2.quantity
);
const tenPercentDiscount = createDiscount(10);

const finalAmount = applyDiscount(shoppingTotal,tenPercentDiscount);
console.log("\nShopping Total:", shoppingTotal);
console.log("Final Amount:", finalAmount);

// output
// Function Type: 30
// Addition: 15
// Multiplication: 50
// Name: Aditya
// Age: 21
// Name: Rahul
// Hello, Aditya
// Hello, Guest
// Total: 600
// Product Total: 90000
// Formatted String: TYPESCRIPT
// Formatted Number: 25.00
// Number Addition: 30
// String Addition: Hello TypeScript
// Welcome Aditya
// Operation Result: 15
// Doubled: [ 2, 4, 6, 8, 10 ]
// Even Numbers: [ 2, 4 ]
// Hello, Aditya
// Double: 20
// Hello, Aditya

// Product: Laptop
// Price: 45000
// Quantity: 1
// Total: 45000

// Product: Mouse
// Price: 800
// Quantity: 2
// Total: 1600

// Shopping Total: 46600
// Final Amount: 41940