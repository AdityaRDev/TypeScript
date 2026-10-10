"use strict";
// ========================================
// Chapter 15: Advanced Types
// ========================================
let key;
key = "id";
key = "name";
key = "price";
key = "category";
// ========================================
// 2. typeof
// ========================================
const product = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};
let productName;
productName = "Laptop";
const savedProduct = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};
let eventName;
eventName = "product-created";
eventName = "product-updated";
eventName = "product-deleted";
// ========================================
// 7. Generic Function with keyof
// ========================================
function getProperty(object, key) {
    return object[key];
}
function calculatePrice(price, quantity) {
    return price * quantity;
}
// ========================================
// Output
// ========================================
console.log("=== Advanced Types ===");
console.log("\nProduct:");
console.log(product);
console.log("\nProduct Key:");
console.log(key);
console.log("\nProduct Name:");
console.log(productName);
console.log("\nProduct Event:");
console.log(eventName);
console.log("\nSaved Product:");
console.log(savedProduct);
console.log("\nGet Product Name:");
console.log(getProperty(product, "name"));
console.log("\nGet Product Price:");
console.log(getProperty(product, "price"));
console.log("\nCalculated Price:");
console.log(calculatePrice(50000, 2));
// === Advanced Types ===                                                                                         
// Product:                                                                                       
// { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' }
// Product Key:                   
// category
// Product Name:
// Laptop
// Product Event:
// product-deleted
// Saved Product:
// { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' }
// Get Product Name:
// Laptop
// Get Product Price:
// 50000
// Calculated Price:
// 100000
