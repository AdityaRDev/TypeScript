import { add, subtract, multiply, divide } from "./math-utils.js";
// 1. Using declared functions
console.log("Addition:", add(20, 10));
console.log("Subtraction:", subtract(20, 10));
console.log("Multiplication:", multiply(5, 4));
console.log("Division:", divide(20, 5));
// 2. Using a custom function
function calculateSquare(value) {
    return value * value;
}
console.log("Square:", calculateSquare(5));
const student = {
    id: 101,
    name: "Rahul",
    course: "B.Com CA"
};
console.log("Student:", student);
// 4. Type-safe function usage
function displayStudent(student) {
    console.log("Student ID:", student.id);
    console.log("Student Name:", student.name);
    console.log("Course:", student.course);
}
displayStudent(student);
// output
// Addition: 30
// Subtraction: 10
// Multiplication: 20
// Division: 4
// Square: 25
// Student: { id: 101, name: 'Rahul', course: 'B.Com CA' }
// Student ID: 101
// Student Name: Rahul
// Course: B.Com CA
