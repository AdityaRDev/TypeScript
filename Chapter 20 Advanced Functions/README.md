# Chapter 20: Advanced Functions

## Learning Objectives

After completing this chapter, you will understand:

- Function type expressions.
- Function type aliases.
- Optional parameters.
- Default parameters.
- Rest parameters.
- Named parameters using object types.
- Function overloads.
- Callback functions.
- Higher-order functions.
- Functions that return functions.
- The `this` parameter in TypeScript.
- The `never` return type.
- Function best practices.

---

## 1. Introduction

Functions are reusable blocks of code that perform specific tasks.

In earlier chapters, we learned how to create basic functions using TypeScript.

Now we will explore advanced function features that help us create flexible, reusable, and type-safe applications.

Example:

```ts
function greet(name: string): string {
    return `Hello, ${name}`;
}

console.log(greet("Aditya"));
```

Output:

```text
Hello, Aditya
```

---

## 2. Function Type Expressions

A function type expression describes the types of a function's parameters and its return value.

Syntax:

```ts
(parameter: type) => returnType
```

Example:

```ts
let calculate: (a: number, b: number) => number;

calculate = function (a, b) {
    return a + b;
};

console.log(calculate(10, 20));
```

Output:

```text
30
```

The variable `calculate` can store a function that:

- Accepts two numbers.
- Returns a number.

The following assignment would produce a type error:

```ts
// Error: the function returns a string instead of a number.

// calculate = function (a, b) {
//     return "Invalid";
// };
```

### Function type with a string return value

```ts
let welcome: (name: string) => string;

welcome = (name) => {
    return `Welcome ${name}`;
};

console.log(welcome("Aditya"));
```

Output:

```text
Welcome Aditya
```

---

## 3. Function Type Aliases

A type alias allows us to give a reusable name to a function type.

Example:

```ts
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => {
    return a + b;
};

const multiply: Operation = (a, b) => {
    return a * b;
};

console.log(add(10, 5));
console.log(multiply(10, 5));
```

Output:

```text
15
50
```

### Why use function type aliases?

- Avoid repeating function type definitions.
- Make code easier to read.
- Reuse the same function type in multiple places.
- Maintain consistent parameter and return types.

---

## 4. Optional Parameters

An optional parameter does not have to be provided when calling a function.

Use `?` after the parameter name.

Example:

```ts
function displayUser(name: string, age?: number): void {

    console.log("Name:", name);

    if (age !== undefined) {
        console.log("Age:", age);
    }
}

displayUser("Aditya", 21);

displayUser("Rahul");
```

Output:

```text
Name: Aditya
Age: 21
Name: Rahul
```

### Important rules

- Optional parameters use `?`.
- Optional parameters can be omitted when calling a function.
- An optional parameter must come after required parameters.

Incorrect example:

```ts
// Error: a required parameter cannot follow an optional parameter.

// function display(age?: number, name: string): void {
//     console.log(name, age);
// }
```

---

## 5. Default Parameters

A default parameter provides a value automatically when an argument is omitted or explicitly passed as `undefined`.

Example:

```ts
function greet(name: string = "Guest"): string {
    return `Hello, ${name}`;
}

console.log(greet("Aditya"));
console.log(greet());
console.log(greet(undefined));
```

Output:

```text
Hello, Aditya
Hello, Guest
Hello, Guest
```

### Default parameter with numbers

```ts
function calculatePrice(price: number, quantity: number = 1): number {
    return price * quantity;
}

console.log(calculatePrice(100, 3));
console.log(calculatePrice(100));
```

Output:

```text
300
100
```

### Optional parameter vs Default parameter

| Optional parameter | Default parameter |
|---|---|
| Uses `?` | Uses `=` |
| May be omitted | May be omitted |
| Value can be `undefined` | Uses a default when omitted or passed as `undefined` |
| Example: `age?: number` | Example: `age: number = 18` |

---

## 6. Rest Parameters

Rest parameters allow a function to accept any number of arguments.

Use `...` before the parameter name.

Example:

```ts
function calculateTotal(...prices: number[]): number {

    let total = 0;

    for (const price of prices) {
        total += price;
    }

    return total;
}

console.log(calculateTotal(100, 200));
console.log(calculateTotal(100, 200, 300));
console.log(calculateTotal(50, 50, 50, 50));
```

Output:

```text
300
600
200
```

### Rest parameter with strings

```ts
function displayNames(...names: string[]): void {

    for (const name of names) {
        console.log(name);
    }
}

displayNames("Aditya", "Rahul", "Amit");
```

Output:

```text
Aditya
Rahul
Amit
```

### Important rules

- A function can have only one rest parameter.
- The rest parameter must be the last parameter.
- It collects remaining arguments into an array.

---

## 7. Named Parameters Using Object Types

When a function has many parameters, passing an object can make the function easier to use.

Example:

```ts
interface Product {
    name: string;
    price: number;
    quantity: number;
}

function calculateProductTotal(product: Product): number {

    return product.price * product.quantity;
}

const product: Product = {
    name: "Laptop",
    price: 45000,
    quantity: 2
};

console.log(calculateProductTotal(product));
```

Output:

```text
90000
```

### Why use object parameters?

Compare:

```ts
function createUser(
    name: string,
    age: number,
    email: string
): void {
    console.log(name, age, email);
}
```

With:

```ts
interface UserDetails {
    name: string;
    age: number;
    email: string;
}

function createUser(user: UserDetails): void {
    console.log(user.name, user.age, user.email);
}
```

Object parameters make calls clearer, especially when a function accepts many related values.

---

## 8. Function Overloading

Function overloading allows us to define multiple function signatures for different argument combinations.

The implementation handles all supported combinations.

Example:

```ts
function formatValue(value: string): string;

function formatValue(value: number): string;

function formatValue(value: string | number): string {

    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}

console.log(formatValue("typescript"));
console.log(formatValue(25));
```

Output:

```text
TYPESCRIPT
25.00
```

### Understanding the code

The first two declarations are overload signatures:

```ts
function formatValue(value: string): string;

function formatValue(value: number): string;
```

The third declaration is the implementation:

```ts
function formatValue(value: string | number): string {
    // Implementation
}
```

The implementation signature is not directly available to callers. Callers must match one of the overload signatures.

### Another example: Add function

```ts
function addValues(a: number, b: number): number;

function addValues(a: string, b: string): string;

function addValues(
    a: number | string,
    b: number | string
): number | string {

    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }

    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }

    throw new Error("Both arguments must have the same type");
}

console.log(addValues(10, 20));
console.log(addValues("Hello ", "TypeScript"));
```

Output:

```text
30
Hello TypeScript
```

---

## 9. Callback Functions

A callback is a function passed as an argument to another function.

Example:

```ts
function processUser(
    name: string,
    callback: (message: string) => void
): void {

    const message = `Welcome ${name}`;

    callback(message);
}

processUser("Aditya", (message) => {
    console.log(message);
});
```

Output:

```text
Welcome Aditya
```

### Callback with a return value

```ts
function calculate(
    a: number,
    b: number,
    callback: (result: number) => void
): void {

    const result = a + b;

    callback(result);
}

calculate(10, 20, (result) => {
    console.log("Result:", result);
});
```

Output:

```text
Result: 30
```

### Where are callbacks used?

- Event handling.
- Array methods.
- Timers.
- Asynchronous operations.
- Custom application functions.

---

## 10. Higher-Order Functions

A higher-order function is a function that accepts another function as an argument, returns a function, or does both.

Example:

```ts
function operate(
    a: number,
    b: number,
    operation: (x: number, y: number) => number
): number {

    return operation(a, b);
}

const result = operate(10, 5, (x, y) => x + y);

console.log(result);
```

Output:

```text
15
```

Here, `operate` is a higher-order function because it accepts another function as an argument.

### Array methods as higher-order functions

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

const evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(doubled);
console.log(evenNumbers);
```

Output:

```text
[2, 4, 6, 8, 10]
[2, 4]
```

`map` and `filter` receive callback functions.

---

## 11. Functions That Return Functions

A function can return another function.

Example:

```ts
function createGreeting(greeting: string): (name: string) => string {

    return function (name: string): string {
        return `${greeting}, ${name}`;
    };
}

const sayHello = createGreeting("Hello");

console.log(sayHello("Aditya"));
console.log(sayHello("Rahul"));
```

Output:

```text
Hello, Aditya
Hello, Rahul
```

### Arrow function version

```ts
function createMultiplier(multiplier: number): (value: number) => number {

    return (value) => value * multiplier;
}

const double = createMultiplier(2);

console.log(double(10));
console.log(double(25));
```

Output:

```text
20
50
```

This technique is useful for creating reusable function behavior.

---

## 12. The this Parameter

In TypeScript, you can explicitly declare the type of `this` in a function.

The `this` parameter is a TypeScript-only parameter. It is removed during compilation and is not a normal runtime argument.

Example:

```ts
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
```

Output:

```text
Hello, Aditya
```

### Why specify this?

It helps TypeScript check which object a function expects to use as `this`.

Arrow functions do not have their own `this`; they use the surrounding `this` value.

---

## 13. The never Return Type

The `never` type represents a function that never completes normally by returning a value.

It is commonly used for functions that always throw an error or run indefinitely.

Example:

```ts
function throwError(message: string): never {

    throw new Error(message);
}

// This call throws an error.
// throwError("Something went wrong");
```

### Never with an infinite loop

```ts
function runForever(): never {

    while (true) {
        // This function never finishes.
    }
}
```

### Difference between void and never

| void | never |
|---|---|
| Function completes without returning a useful value | Function never completes normally |
| Example: logging function | Example: function that always throws |
| Can finish execution | Does not reach normal completion |

Example:

```ts
function displayMessage(): void {
    console.log("Hello");
}

function stopProgram(): never {
    throw new Error("Program stopped");
}
```

---

## 14. Practical Example: E-Commerce Shopping System

This example uses advanced function concepts in a simple shopping system.

```ts
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

type DiscountFunction = (price: number) => number;

function calculateTotal(...prices: number[]): number {

    return prices.reduce((total, price) => total + price, 0);
}

function applyDiscount(
    total: number,
    discount: DiscountFunction
): number {

    return discount(total);
}

function displayProduct(product: Product): void {

    console.log("Product:", product.name);
    console.log("Price:", product.price);
    console.log("Quantity:", product.quantity);

    console.log(
        "Total:",
        product.price * product.quantity
    );
}

function createDiscount(percentage: number): DiscountFunction {

    return (price) => {
        return price - (price * percentage / 100);
    };
}

const product1: Product = {
    id: 101,
    name: "Laptop",
    price: 45000,
    quantity: 1
};

const product2: Product = {
    id: 102,
    name: "Mouse",
    price: 800,
    quantity: 2
};

displayProduct(product1);

displayProduct(product2);

const total = calculateTotal(
    product1.price * product1.quantity,
    product2.price * product2.quantity
);

const discount = createDiscount(10);

const finalAmount = applyDiscount(total, discount);

console.log("Shopping Total:", total);
console.log("Final Amount After Discount:", finalAmount);
```

Output:

```text
Product: Laptop
Price: 45000
Quantity: 1
Total: 45000
Product: Mouse
Price: 800
Quantity: 2
Total: 1600
Shopping Total: 46600
Final Amount After Discount: 41940
```

### Concepts used

- Interfaces.
- Function type aliases.
- Rest parameters.
- Callback functions.
- Higher-order functions.
- Functions returning functions.
- Arrow functions.
- Array methods.

---

## 15. Practice Tasks

Complete these tasks without copying the practical example.

### Task 1: Function Type

Create a function type called `Calculator`.

It should accept two numbers and return a number.

Create addition, subtraction, multiplication, and division functions using this type.

### Task 2: Optional and Default Parameters

Create a function that accepts:

- A required name.
- An optional age.
- A default city of `"Pune"`.

Display all available information.

### Task 3: Rest Parameters

Create a function that accepts any number of marks and calculates their total and average.

### Task 4: Function Overloading

Create a function named `convertValue`.

- When given a number, return it as a string.
- When given a string, return its length.

Use function overloads.

### Task 5: Callback Function

Create a function that accepts two numbers and a callback.

Pass their multiplication result to the callback.

### Task 6: Higher-Order Function

Create a function that accepts an array of numbers and a callback.

Use the callback to transform each number.

### Task 7: Function Returning Function

Create a function that returns another function to calculate the square of a number.

### Task 8: Never Return Type

Create a function that accepts an error message and throws an error using the `never` return type.

---

## 16. Important Points to Remember

- Function type expressions define parameter and return types.
- Type aliases make function types reusable.
- Optional parameters use `?`.
- Default parameters use `=`.
- Rest parameters use `...`.
- Object parameters make functions easier to understand.
- Function overloads support multiple call signatures.
- Callback functions are passed into other functions.
- Higher-order functions accept or return other functions.
- Functions can return other functions.
- The `this` parameter provides an explicit type for `this`.
- The `never` type represents functions that never complete normally.

---


