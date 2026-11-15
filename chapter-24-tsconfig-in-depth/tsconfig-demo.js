"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Basic typed variable
const appName = "TypeScript Configuration";
console.log("Application:", appName);
// 2. Function with explicit types
function calculateTotal(price, quantity) {
    return price * quantity;
}
console.log("Total:", calculateTotal(500, 3));
const student = {
    id: 101,
    name: "Rahul",
    course: "B.Com CA"
};
console.log("Student:", student);
// 4. Optional and nullable values
function displayName(name) {
    if (name !== null) {
        console.log("Name:", name);
    }
    else {
        console.log("Name is not available");
    }
}
displayName("Rahul");
displayName(null);
// 5. Array with a defined type
const marks = [75, 80, 90];
console.log("Marks:", marks);
// 6. Arrow function
const calculateAverage = (values) => {
    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
};
console.log("Average:", calculateAverage(marks));
// 7. Class
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    display() {
        console.log(`Product: ${this.name}, Price: ${this.price}`);
    }
}
const laptop = new Product("Laptop", 45000);
laptop.display();
// 8. Type-safe object function
function displayStudent(student) {
    console.log("Student ID:", student.id);
    console.log("Student Name:", student.name);
    console.log("Student Course:", student.course);
}
displayStudent(student);
//# sourceMappingURL=tsconfig-demo.js.map