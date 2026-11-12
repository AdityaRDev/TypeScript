# Chapter 21: Advanced Classes

## Learning Objectives

After completing this chapter, you will understand:

- Access modifiers: public, private, and protected.
- Inheritance using `extends`.
- Method overriding.
- The `super` keyword.
- Abstract classes and methods.
- Getters and setters.
- Static properties and methods.
- Readonly properties.
- Constructor parameter properties.
- Polymorphism.
- Implementing multiple interfaces.
- The `instanceof` operator.
- Class best practices.

---

## 1. Introduction

Classes are a fundamental part of object-oriented programming.

A class is a blueprint for creating objects. It can contain properties, constructors, and methods.

Example:

```ts
class Student {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    display(): void {
        console.log("Student:", this.name);
    }
}

const student = new Student("Aditya");

student.display();
```

Output:

```text
Student: Aditya
```

In this chapter, we will explore advanced class features in TypeScript.

---

## 2. Access Modifiers

Access modifiers control where class properties and methods can be accessed.

TypeScript provides three main access modifiers:

- `public`
- `private`
- `protected`

### A. Public

A public member can be accessed from anywhere.

Example:

```ts
class User {

    public username: string;

    constructor(username: string) {
        this.username = username;
    }
}

const user = new User("Aditya");

console.log(user.username);
```

Output:

```text
Aditya
```

The `public` modifier is the default when no access modifier is specified.

### B. Private

A private member can only be accessed inside the class where it is declared.

Example:

```ts
class BankAccount {

    private balance: number = 5000;

    displayBalance(): void {
        console.log("Balance:", this.balance);
    }
}

const account = new BankAccount();

account.displayBalance();

// Error: balance is private.
// console.log(account.balance);
```

Output:

```text
Balance: 5000
```

### C. Protected

A protected member can be accessed inside its class and its subclasses.

Example:

```ts
class Person {

    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {

    displayName(): void {
        console.log("Employee:", this.name);
    }
}

const employee = new Employee("Aditya");

employee.displayName();

// Error: name is protected.
// console.log(employee.name);
```

Output:

```text
Employee: Aditya
```

### Comparison

| Modifier | Inside class | Subclass | Outside class |
|---|---|---|---|
| public | Yes | Yes | Yes |
| private | Yes | No | No |
| protected | Yes | Yes | No |

**Important:** TypeScript's `private` and `protected` modifiers provide compile-time access restrictions. JavaScript runtime-private fields use the `#` syntax.

---

## 3. Inheritance

Inheritance allows one class to reuse the properties and methods of another class.

The `extends` keyword is used to inherit a class.

Example:

```ts
class Animal {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    eat(): void {
        console.log(this.name, "is eating");
    }
}

class Dog extends Animal {

    bark(): void {
        console.log(this.name, "is barking");
    }
}

const dog = new Dog("Tommy");

dog.eat();
dog.bark();
```

Output:

```text
Tommy is eating
Tommy is barking
```

Here:

- `Animal` is the parent class.
- `Dog` is the child class.
- `Dog` inherits the `name` property and `eat()` method.

### Benefits of inheritance

- Reuse existing code.
- Reduce duplication.
- Organize related classes.
- Extend existing functionality.

---

## 4. The super Keyword

The `super` keyword is used to access the parent class constructor or methods.

Example:

```ts
class Person {

    constructor(public name: string) {}

    display(): void {
        console.log("Name:", this.name);
    }
}

class Employee extends Person {

    constructor(name: string, public salary: number) {
        super(name);
    }

    showEmployee(): void {
        super.display();

        console.log("Salary:", this.salary);
    }
}

const employee = new Employee("Aditya", 30000);

employee.showEmployee();
```

Output:

```text
Name: Aditya
Salary: 30000
```

### Important rules

- A child class uses `super()` to call the parent constructor.
- In a derived class constructor, `super()` must be called before using `this`.
- `super.methodName()` calls a parent class method.

---

## 5. Method Overriding

Method overriding occurs when a child class provides its own implementation of a method inherited from its parent class.

Example:

```ts
class Animal {

    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {

    override makeSound(): void {
        console.log("Dog barks");
    }
}

class Cat extends Animal {

    override makeSound(): void {
        console.log("Cat meows");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound();
cat.makeSound();
```

Output:

```text
Dog barks
Cat meows
```

The `override` keyword indicates that a child class intentionally replaces an inherited method.

It also helps TypeScript detect mistakes when the parent method does not exist.

---

## 6. Abstract Classes

An abstract class is a class that cannot be directly instantiated.

It is designed to be inherited by other classes.

Use the `abstract` keyword.

Example:

```ts
abstract class Shape {

    abstract calculateArea(): number;

    display(): void {
        console.log("Calculating shape area");
    }
}

class Rectangle extends Shape {

    constructor(
        private width: number,
        private height: number
    ) {
        super();
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

const rectangle = new Rectangle(10, 5);

rectangle.display();

console.log("Area:", rectangle.calculateArea());
```

Output:

```text
Calculating shape area
Area: 50
```

### Important rules

- An abstract class cannot be instantiated directly.
- An abstract method does not contain an implementation in the abstract class.
- A concrete subclass must implement inherited abstract methods.
- Abstract classes can contain normal methods and properties.

---

## 7. Getters and Setters

Getters and setters provide controlled access to class properties.

- A getter reads a value.
- A setter updates a value.

Example:

```ts
class Employee {

    private _salary: number = 0;

    get salary(): number {
        return this._salary;
    }

    set salary(value: number) {

        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }

        this._salary = value;
    }
}

const employee = new Employee();

employee.salary = 30000;

console.log(employee.salary);
```

Output:

```text
30000
```

### Why use getters and setters?

- Protect internal properties.
- Validate values before updating them.
- Control how properties are read.
- Keep class data consistent.

---

## 8. Static Properties and Methods

Static members belong to the class itself rather than individual objects.

Use the `static` keyword.

Example:

```ts
class Counter {

    static count: number = 0;

    constructor() {
        Counter.count++;
    }

    static displayCount(): void {
        console.log("Objects created:", Counter.count);
    }
}

const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();

Counter.displayCount();
```

Output:

```text
Objects created: 3
```

### Important points

- Access static properties using the class name.
- Call static methods using the class name.
- Static methods cannot directly access instance properties through `this`.
- Static members are shared at the class level.

---

## 9. Readonly Properties

The `readonly` modifier prevents a property from being reassigned after initialization.

Example:

```ts
class Product {

    readonly id: number;

    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    updateName(newName: string): void {
        this.name = newName;
    }
}

const product = new Product(101, "Laptop");

product.updateName("Gaming Laptop");

console.log(product.id);
console.log(product.name);

// Error: id is readonly.
// product.id = 202;
```

Output:

```text
101
Gaming Laptop
```

A readonly property can be initialized when it is declared or inside the constructor.

---

## 10. Constructor Parameter Properties

TypeScript provides a shortcut for declaring and initializing class properties through constructor parameters.

You can use access modifiers or `readonly` in constructor parameters.

Example:

```ts
class Student {

    constructor(
        public name: string,
        private age: number,
        readonly rollNumber: number
    ) {}

    display(): void {
        console.log("Name:", this.name);
        console.log("Age:", this.age);
        console.log("Roll Number:", this.rollNumber);
    }
}

const student = new Student("Aditya", 21, 101);

student.display();
```

Output:

```text
Name: Aditya
Age: 21
Roll Number: 101
```

Without parameter properties, you would need to declare the properties separately and assign them inside the constructor.

---

## 11. Polymorphism

Polymorphism means one common interface or parent type can represent objects with different implementations.

Example:

```ts
class Animal {

    makeSound(): void {
        console.log("Animal sound");
    }
}

class Dog extends Animal {

    override makeSound(): void {
        console.log("Dog barks");
    }
}

class Cat extends Animal {

    override makeSound(): void {
        console.log("Cat meows");
    }
}

function playSound(animal: Animal): void {
    animal.makeSound();
}

const dog = new Dog();
const cat = new Cat();

playSound(dog);
playSound(cat);
```

Output:

```text
Dog barks
Cat meows
```

The same `playSound()` function works with different objects.

### Benefits of polymorphism

- Flexible code.
- Easier extension.
- Reduced duplicate logic.
- Different implementations through a common type.

---

## 12. Implementing Multiple Interfaces

A TypeScript class can implement more than one interface.

Use the `implements` keyword.

Example:

```ts
interface Printable {
    print(): void;
}

interface Downloadable {
    download(): void;
}

class DocumentFile implements Printable, Downloadable {

    print(): void {
        console.log("Printing document");
    }

    download(): void {
        console.log("Downloading document");
    }
}

const file = new DocumentFile();

file.print();
file.download();
```

Output:

```text
Printing document
Downloading document
```

### Important points

- A class can implement multiple interfaces.
- It must provide all required members from those interfaces.
- Interfaces describe the structure that a class must follow.

---

## 13. The instanceof Operator

The `instanceof` operator checks whether an object was created from a particular class or its inheritance chain.

Example:

```ts
class Animal {}

class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);
console.log(dog instanceof Animal);
```

Output:

```text
true
true
```

It is useful when checking object types at runtime.

---

## 14. Practical Example: Employee Management System

This example combines advanced class concepts into one application.

```ts
abstract class Employee {

    static employeeCount: number = 0;

    constructor(
        public readonly id: number,
        public name: string,
        protected salary: number
    ) {
        Employee.employeeCount++;
    }

    abstract calculateBonus(): number;

    get monthlySalary(): number {
        return this.salary;
    }

    set monthlySalary(value: number) {

        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }

        this.salary = value;
    }

    displayDetails(): void {

        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Salary:", this.salary);
    }

    static displayEmployeeCount(): void {
        console.log("Total Employees:", Employee.employeeCount);
    }
}

class Manager extends Employee {

    constructor(
        id: number,
        name: string,
        salary: number,
        public department: string
    ) {
        super(id, name, salary);
    }

    calculateBonus(): number {
        return this.salary * 0.20;
    }

    override displayDetails(): void {

        super.displayDetails();

        console.log("Department:", this.department);
        console.log("Bonus:", this.calculateBonus());
    }
}

class Developer extends Employee {

    constructor(
        id: number,
        name: string,
        salary: number,
        public programmingLanguage: string
    ) {
        super(id, name, salary);
    }

    calculateBonus(): number {
        return this.salary * 0.10;
    }

    override displayDetails(): void {

        super.displayDetails();

        console.log("Language:", this.programmingLanguage);
        console.log("Bonus:", this.calculateBonus());
    }
}

const manager = new Manager(
    101,
    "Aditya",
    50000,
    "IT"
);

const developer = new Developer(
    102,
    "Rahul",
    40000,
    "TypeScript"
);

manager.displayDetails();

console.log("----------------");

developer.displayDetails();

console.log("----------------");

Employee.displayEmployeeCount();
```

Output:

```text
ID: 101
Name: Aditya
Salary: 50000
Department: IT
Bonus: 10000
----------------
ID: 102
Name: Rahul
Salary: 40000
Language: TypeScript
Bonus: 4000
----------------
Total Employees: 2
```

### Concepts used

- Abstract classes.
- Abstract methods.
- Inheritance.
- Constructor parameter properties.
- Public, private and protected access.
- Readonly properties.
- Getters and setters.
- Static members.
- Method overriding.
- Polymorphism.

---

## 15. Practice Tasks

Complete these tasks without copying the practical example.

### Task 1: Bank Account

Create a `BankAccount` class with:

- A public account holder name.
- A private balance.
- A deposit method.
- A withdrawal method.
- A method to display the balance.

Do not allow withdrawals greater than the available balance.

### Task 2: Inheritance

Create a `Vehicle` parent class.

Create `Car` and `Bike` child classes.

Add different methods to each child class.

### Task 3: Abstract Class

Create an abstract class named `Payment`.

Add an abstract method named `processPayment()`.

Create `UPIPayment` and `CardPayment` classes.

### Task 4: Getters and Setters

Create a `Product` class with a private price.

Use a getter and setter to access and update the price.

Do not allow negative prices.

### Task 5: Static Members

Create a class named `User`.

Count how many objects are created using a static property.

### Task 6: Multiple Interfaces

Create two interfaces named `Playable` and `Downloadable`.

Create a class that implements both interfaces.

### Task 7: Polymorphism

Create a parent class named `Shape`.

Create `Circle` and `Rectangle` child classes.

Implement an area calculation method in each class.

Use a common function to display their areas.

---

## 16. Important Points to Remember

- Access modifiers control member visibility.
- `public` allows access from anywhere.
- `private` restricts access to the declaring class.
- `protected` allows access in the declaring class and subclasses.
- `extends` provides inheritance.
- `super()` calls the parent constructor.
- `override` indicates method overriding.
- Abstract classes cannot be instantiated directly.
- Getters read values and setters update values.
- Static members belong to the class.
- Readonly properties cannot be reassigned after initialization.
- Constructor parameter properties reduce repetitive code.
- Polymorphism allows different objects to use a common parent type.
- A class can implement multiple interfaces.
- `instanceof` checks an object's class at runtime.

---

