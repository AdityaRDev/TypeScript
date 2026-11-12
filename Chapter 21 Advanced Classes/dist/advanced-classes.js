"use strict";
// 1. Access Modifiers
class BankAccount {
    accountHolder;
    balance;
    accountType;
    constructor(accountHolder, balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.accountType = "Savings";
    }
    deposit(balance) {
        this.balance += balance;
    }
    withdraw(balance) {
        this.balance -= balance;
    }
    displayBalance() {
        console.log("Account Holder:", this.accountHolder);
        console.log("Balance:", this.balance);
        console.log("Account Type:", this.accountType);
    }
}
const account = new BankAccount("Aditya", 5000);
account.deposit(5000);
account.withdraw(100);
account.displayBalance();
// 2. Inheritance and super
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(this.name, "is eating");
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log(this.name, "is barking");
    }
}
const dog = new Dog("Tommy");
dog.eat();
dog.bark();
// 3. Method Overriding
class Vehicle {
    start() {
        console.log("Vehicle is starting");
    }
}
class Car extends Vehicle {
    start() {
        console.log("Car engine started");
    }
}
const car = new Car();
car.start();
// 4. Abstract Classes
class Shape {
    display() {
        console.log("Calculating area");
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
}
const rectangle = new Rectangle(10, 5);
rectangle.display();
console.log("Rectangle Area:", rectangle.calculateArea());
// 5. Getters and Setters
class EmployeeSalary {
    _salary = 0;
    get salary() {
        return this._salary;
    }
    set salary(value) {
        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }
        this._salary = value;
    }
}
const employeeSalary = new EmployeeSalary();
employeeSalary.salary = 30000;
console.log("Employee Salary:", employeeSalary.salary);
// 6. Static Properties and Methods
class Counter {
    static count = 0;
    constructor() {
        Counter.count++;
    }
    static displayCount() {
        console.log("Objects Created:", Counter.count);
    }
}
const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();
Counter.displayCount();
// 7. Readonly Properties
class Product {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    updateName(newName) {
        this.name = newName;
    }
}
const product = new Product(101, "Laptop");
product.updateName("Gaming Laptop");
console.log("Product ID:", product.id);
console.log("Product Name:", product.name);
// 8. Constructor Parameter Properties
class Student {
    name;
    age;
    rollNumber;
    constructor(name, age, rollNumber) {
        this.name = name;
        this.age = age;
        this.rollNumber = rollNumber;
    }
    display() {
        console.log("Student Name:", this.name);
        console.log("Age:", this.age);
        console.log("Roll Number:", this.rollNumber);
    }
}
const student = new Student("Aditya", 21, 101);
student.display();
// 9. Polymorphism
class AnimalSound {
    makeSound() {
        console.log("Animal makes a sound");
    }
}
class DogSound extends AnimalSound {
    makeSound() {
        console.log("Dog barks");
    }
}
class CatSound extends AnimalSound {
    makeSound() {
        console.log("Cat meows");
    }
}
function playSound(animal) {
    animal.makeSound();
}
playSound(new DogSound());
playSound(new CatSound());
class DocumentFile {
    print() {
        console.log("Printing document");
    }
    download() {
        console.log("Downloading document");
    }
}
const file = new DocumentFile();
file.print();
file.download();
// 11. instanceof Operator
class Person {
}
class Teacher extends Person {
}
const teacher = new Teacher();
console.log("Is  Teacher:", teacher instanceof Teacher);
console.log("Is Person:", teacher instanceof Person);
// 12. Practical Example: Employee Management System
class CompanyEmployee {
    id;
    name;
    salary;
    static employeeCount = 0;
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        CompanyEmployee.employeeCount++;
    }
    get monthlySalary() {
        return this.salary;
    }
    set monthlySalary(value) {
        if (value < 0) {
            throw new Error("Salary cannot be negative");
        }
        this.salary = value;
    }
    displayDetails() {
        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Salary:", this.salary);
    }
    static displayEmployeeCount() {
        console.log("Total Employees:", CompanyEmployee.employeeCount);
    }
}
class Manager extends CompanyEmployee {
    department;
    constructor(id, name, salary, department) {
        super(id, name, salary);
        this.department = department;
    }
    calculateBonus() {
        return this.salary * 0.20;
    }
    displayDetails() {
        super.displayDetails();
        console.log("Department:", this.department);
        console.log("Bonus:", this.calculateBonus());
    }
}
class Developer extends CompanyEmployee {
    programmingLanguage;
    constructor(id, name, salary, programmingLanguage) {
        super(id, name, salary);
        this.programmingLanguage = programmingLanguage;
    }
    calculateBonus() {
        return this.salary * 0.10;
    }
    displayDetails() {
        super.displayDetails();
        console.log("Language:", this.programmingLanguage);
        console.log("Bonus:", this.calculateBonus());
    }
}
const manager = new Manager(101, "Aditya", 50000, "IT");
const developer = new Developer(102, "Rahul", 40000, "TypeScript");
manager.displayDetails();
console.log("----------------");
developer.displayDetails();
console.log("----------------");
CompanyEmployee.displayEmployeeCount();
// 13. Polymorphism with Employee Classes
const employees = [manager, developer];
for (const employee of employees) {
    console.log(employee.name, "Bonus:", employee.calculateBonus());
}
// output
// Account Holder: Aditya
// Balance: 9900
// Account Type: Savings
// Tommy is eating
// Tommy is barking
// Car engine started
// Calculating area
// Rectangle Area: 50
// Employee Salary: 30000
// Objects Created: 3
// Product ID: 101
// Product Name: Gaming Laptop
// Student Name: Aditya
// Age: 21
// Roll Number: 101
// Dog barks
// Cat meows
// Printing document
// Downloading document
// Is  Teacher: true
// Is Person: true
// ID: 101
// Name: Aditya
// Salary: 50000
// Department: IT
// Bonus: 10000
// ----------------
// ID: 102
// Name: Rahul
// Salary: 40000
// Language: TypeScript
// Bonus: 4000
// ----------------
// Total Employees: 2
// Aditya Bonus: 10000
// Rahul Bonus: 4000
