"use strict";
// ========================================
// CHAPTER 18: TYPE ASSERTIONS & SATISFIES
// ========================================
// 1. Basic Type Assertion
let value = "Hello TypeScript";
let message = value;
console.log("===== BASIC ASSERTION =====");
console.log(message.toUpperCase());
console.log(message.length);
console.log(message[0]);
// 2. Type Assertion with Variables
let input = "Aditya";
let text = input;
console.log("\n===== VARIABLE ASSERTION =====");
console.log(text.length);
console.log(text.toUpperCase());
console.log(text[0]);
// 3. Angle-Bracket Assertion
let data = "Welcome";
let result = data;
console.log("\n===== ANGLE BRACKET =====");
console.log(result.toUpperCase());
console.log(result[0]);
let userData = {
    id: 101,
    name: "Aditya",
    email: "aditya@example.com"
};
let user = userData;
console.log("\n===== OBJECT ASSERTION =====");
console.log(user.name);
console.log(user.email);
// 5. Type Assertion with Arrays
let arrayData = [10, 20, 30, 40];
let numbers = arrayData;
console.log("\n===== ARRAY ASSERTION =====");
console.log(numbers[0]);
console.log(numbers.length);
// 6. Safe Type Narrowing
function displayUser(data) {
    if (typeof data === "object" &&
        data !== null &&
        "name" in data &&
        "age" in data &&
        typeof data.name === "string" &&
        typeof data.age === "number") {
        console.log("Name:", data.name);
        console.log("Age:", data.age);
    }
    else {
        console.log("Invalid user data");
    }
}
console.log("\n===== TYPE NARROWING =====");
displayUser({
    name: "Aditya",
    age: 21
});
displayUser("Invalid Data");
// 7. Double Type Assertion
let originalValue = "Hello";
let convertedValue = originalValue;
console.log("\n===== DOUBLE ASSERTION =====");
console.log(typeof convertedValue);
// // 8. Non-Null Assertion
let username = "Aditya";
console.log("\n===== NON NULL ASSERTION =====");
console.log(username.toUpperCase());
// 9. Safe Null Checking
let userName = null;
console.log("\n===== SAFE NULL CHECK =====");
if (userName !== null) {
    console.log(userName);
}
else {
    console.log("Username is null");
}
// 10. Const Assertion
const userConfig = {
    name: "Aditya",
    role: "Admin",
    active: true
};
console.log("\n===== CONST ASSERTION =====");
console.log(userConfig.name);
console.log(userConfig.role);
console.log(userConfig.active);
// These assignments would cause errors:
// userConfig.name = "Alex";
// userConfig.role = "User";
// 11. Const Assertion with Arrays
const colors = [
    "Red",
    "Green",
    "Blue"
];
console.log("\n===== CONST ARRAY =====");
console.log(colors);
console.log(colors[0]);
const userSettings = {
    name: "Aditya",
    age: 21,
    active: true
};
console.log("\n===== SATISFIES OBJECT =====");
console.log(userSettings);
const roles = [
    "Admin",
    "User",
    "Guest"
];
console.log("\n===== SATISFIES ARRAY =====");
console.log(roles);
const config = {
    appName: "LinguaAI",
    version: 1,
    environment: "production",
    debug: false
};
console.log("\n===== APP CONFIGURATION =====");
console.log(config.appName);
console.log(config.version);
console.log(config.environment);
console.log(config.debug);
// 15. keyof and typeof with as const
const ProductNames = {
    Laptop: "Laptop",
    Mobile: "Mobile",
    Tablet: "Tablet"
};
function displayProduct(product) {
    console.log("Selected Product:", product);
}
console.log("\n===== KEYOF AND TYPEOF =====");
displayProduct(ProductNames.Laptop);
displayProduct(ProductNames.Mobile);
displayProduct(ProductNames.Tablet);
const product = {
    id: 101,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};
function displayProductDetails(product) {
    console.log("Product ID:", product.id);
    console.log("Product Name:", product.name);
    console.log("Price:", product.price);
    console.log("Category:", product.category);
}
console.log("\n===== COMPLETE PRODUCT EXAMPLE =====");
displayProductDetails(product);
// output
// ===== BASIC ASSERTION =====
// HELLO TYPESCRIPT
// 16
// H
// ===== VARIABLE ASSERTION =====
// 6
// ADITYA
// A
// ===== ANGLE BRACKET =====
// WELCOME
// W
// ===== OBJECT ASSERTION =====
// Aditya
// aditya@example.com
// ===== ARRAY ASSERTION =====
// 10
// 4
// ===== TYPE NARROWING =====
// Name: Aditya
// Age: 21
// Invalid user data
// ===== DOUBLE ASSERTION =====
// string
// ===== NON NULL ASSERTION =====
// ADITYA
// ===== SAFE NULL CHECK =====
// Username is null
// ===== CONST ASSERTION =====
// Aditya
// Admin
// true
// ===== CONST ARRAY =====
// [ 'Red', 'Green', 'Blue' ]
// Red
// ===== SATISFIES OBJECT =====
// { name: 'Aditya', age: 21, active: true }
// ===== SATISFIES ARRAY =====
// [ 'Admin', 'User', 'Guest' ]
// ===== APP CONFIGURATION =====
// LinguaAI
// 1
// production
// false
// ===== KEYOF AND TYPEOF =====
// Selected Product: Laptop
// Selected Product: Mobile
// Selected Product: Tablet
// ===== COMPLETE PRODUCT EXAMPLE =====
// Product ID: 101
// Product Name: Laptop
// Price: 50000
// Category: Electronics
