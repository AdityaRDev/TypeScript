interface Student {
    id: number;
    name: string;
    email: string | null;
    phone?: string;
}

// 1. Undefined example
let username: string | undefined;
console.log("Username:", username);
username = "Aditya";
console.log("Updated Username:", username);


// 2. Null example
let selectedUser: string | null = null;
console.log("Selected User:", selectedUser);
selectedUser = "Aditya";
console.log("Updated Selected User:", selectedUser);


// 3. Checking null and undefined
function displayValue(value: string | null | undefined): void {
    if (value !== null && value !== undefined) {
        console.log("Value:", value.toUpperCase());
    } else {
        console.log("Value is missing");
    }
}
displayValue("TypeScript");
displayValue(null);
displayValue(undefined);


// 4. Optional properties
const student1: Student = {
    id: 101,
    name: "Aditya",
    email: "aditya@example.com",
    phone: "9876543210"
};
const student2: Student = {
    id: 102,
    name: "Rahul",
    email: null
};
console.log("Student 1:", student1);
console.log("Student 2:", student2);


// 5. Optional chaining
interface User {
    name: string;
    address?: {
        city: string;
    };
}
const user: User = {
    name: "Aditya"
};
console.log("City:", user.address?.city);


// 6. Nullish coalescing
const email: string | null = null;
const displayEmail = email ?? "Email not available";
console.log("Email:", displayEmail);


// 7. Difference between || and ??
const age = 0;
console.log("Using ||:", age || 18);
console.log("Using ??:", age ?? 18);


// 8. Non-null assertion
const message: string | null = "Hello TypeScript";
console.log(message!.toUpperCase());

// 9. Student information practical example
function displayStudent(student: Student): void {
    console.log("\nStudent ID:", student.id);
    console.log("Student Name:", student.name);
    console.log("Email:",student.email ?? "Email not available");
    console.log("Phone:",student.phone ?? "Phone not available");
}
displayStudent(student1);
displayStudent(student2);


// 10. Function with default handling
function getUsername(name: string | null | undefined): string {
    if (name === null || name === undefined) {
        return "Guest";
    }
    return name;
}
console.log("\nUsername:", getUsername("Aditya"));
console.log("Username:", getUsername(null));
console.log("Username:", getUsername(undefined));

// output 
// Username: undefined
// Updated Username: Aditya
// Selected User: null
// Updated Selected User: Aditya
// Value: TYPESCRIPT
// Value is missing
// Value is missing
// Student 1: {
//   id: 101,
//   name: 'Aditya',
//   email: 'aditya@example.com',
//   phone: '9876543210'
// }
// Student 2: { id: 102, name: 'Rahul', email: null }
// City: undefined
// Email: Email not available
// Using ||: 18
// Using ??: 0
// HELLO TYPESCRIPT

// Student ID: 101
// Student Name: Aditya
// Email: aditya@example.com
// Phone: 9876543210

// Student ID: 102
// Student Name: Rahul
// Email: Email not available
// Phone: Phone not available

// Username: Aditya
// Username: Guest
// Username: Guest