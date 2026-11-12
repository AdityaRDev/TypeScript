// 1. Access Modifiers
class BankAccount {
    public accountHolder: string;
    private balance: number;
    protected accountType: string;
    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.accountType = "Savings";
    }
    deposit(balance:number):void{
        this.balance+=balance;
    }
    withdraw(balance:number):void{
        this.balance-=balance;
    }
    displayBalance(): void {
        console.log("Account Holder:", this.accountHolder);
        console.log("Balance:", this.balance);
        console.log("Account Type:", this.accountType);
    }
}
const account = new BankAccount("Aditya", 5000);
account.deposit(5000);
account.withdraw(100)
account.displayBalance();


// 2. Inheritance and super
class Animal {
    constructor(public name: string) {}
    eat(): void {
        console.log(this.name, "is eating");
    }
}
class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }
    bark(): void {
        console.log(this.name, "is barking");
    }
}
const dog = new Dog("Tommy");
dog.eat();
dog.bark();


// 3. Method Overriding
class Vehicle {
    start(): void {
        console.log("Vehicle is starting");
    }
}
class Car extends Vehicle {
    override start(): void {
        console.log("Car engine started");
    }
}
const car = new Car();
car.start();


// 4. Abstract Classes
abstract class Shape {
    abstract calculateArea(): number;
    display(): void {
        console.log("Calculating area");
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
console.log("Rectangle Area:", rectangle.calculateArea());


// 5. Getters and Setters
class EmployeeSalary {
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
const employeeSalary = new EmployeeSalary();
employeeSalary.salary = 30000;
console.log("Employee Salary:", employeeSalary.salary);


// 6. Static Properties and Methods
class Counter {
    static count: number = 0;
    constructor() {
        Counter.count++;
    }
    static displayCount(): void {
        console.log("Objects Created:", Counter.count);
    }
}
const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();
Counter.displayCount();


// 7. Readonly Properties
class Product {
    constructor(
        public readonly id: number,
        public name: string
    ) {}
    updateName(newName: string): void {
        this.name = newName;
    }
}
const product = new Product(101, "Laptop");
product.updateName("Gaming Laptop");
console.log("Product ID:", product.id);
console.log("Product Name:", product.name);


// 8. Constructor Parameter Properties
class Student {
    constructor(
        public name: string,
        private age: number,
        readonly rollNumber: number
    ) {}
    display(): void {
        console.log("Student Name:", this.name);
        console.log("Age:", this.age);
        console.log("Roll Number:", this.rollNumber);
    }
}
const student = new Student("Aditya", 21, 101);
student.display();


// 9. Polymorphism
class AnimalSound {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}
class DogSound extends AnimalSound {
    override makeSound(): void {
        console.log("Dog barks");
    }
}
class CatSound extends AnimalSound {
    override makeSound(): void {
        console.log("Cat meows");
    }
}
function playSound(animal: AnimalSound): void {
    animal.makeSound();
}
playSound(new DogSound());
playSound(new CatSound());


// 10. Implementing Multiple Interfaces
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


// 11. instanceof Operator
class Person {}
class Teacher extends Person {}
const teacher = new Teacher();
console.log("Is  Teacher:", teacher instanceof Teacher);
console.log("Is Person:", teacher instanceof Person);


// 12. Practical Example: Employee Management System
abstract class CompanyEmployee {

    static employeeCount: number = 0;

    constructor(
        public readonly id: number,
        public name: string,
        protected salary: number
    ) {
        CompanyEmployee.employeeCount++;
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
        console.log("Total Employees:", CompanyEmployee.employeeCount);
    }
}

class Manager extends CompanyEmployee {

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

class Developer extends CompanyEmployee {

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

const manager = new Manager(101, "Aditya", 50000, "IT");

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

CompanyEmployee.displayEmployeeCount();


// 13. Polymorphism with Employee Classes

const employees: CompanyEmployee[] = [manager, developer];

for (const employee of employees) {
    console.log(
        employee.name,
        "Bonus:",
        employee.calculateBonus()
    );
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