// 1. Basic typed variable
const appName: string = "TypeScript Configuration";
console.log("Application:", appName);

// 2. Function with explicit types
function calculateTotal(
    price: number,
    quantity: number
): number {
    return price * quantity;
}
console.log("Total:", calculateTotal(500, 3));

// 3. Interface
interface Student {
    id: number;
    name: string;
    course: string;
}
const student: Student = {
    id: 101,
    name: "Rahul",
    course: "B.Com CA"
};
console.log("Student:", student);

// 4. Optional and nullable values
function displayName(name: string | null): void {
    if (name !== null) {
        console.log("Name:", name);
    } else {
        console.log("Name is not available");
    }
}
displayName("Rahul");
displayName(null);

// 5. Array with a defined type
const marks: number[] = [75, 80, 90];
console.log("Marks:", marks);


// 6. Arrow function
const calculateAverage = (values: number[]): number => {
    const total = values.reduce(
        (sum, value) => sum + value,
        0
    );

    return total / values.length;
};
console.log("Average:", calculateAverage(marks));

// 7. Class
class Product {
    constructor(
        public name: string,
        public price: number
    ) {}

    display(): void {
        console.log(
            `Product: ${this.name}, Price: ${this.price}`
        );
    }
}

const laptop = new Product("Laptop", 45000);

laptop.display();


// 8. Type-safe object function
function displayStudent(student: Student): void {
    console.log("Student ID:", student.id);
    console.log("Student Name:", student.name);
    console.log("Student Course:", student.course);
}
displayStudent(student);


// output
// Total: 1500
// Student: { id: 101, name: 'Rahul', course: 'B.Com CA' }
// Name: Rahul
// Name is not available
// Marks: [ 75, 80, 90 ]
// Average: 81.66666666666667
// Product: Laptop, Price: 45000
// Student ID: 101
// Student Name: Rahul
// Student Course: B.Com CA