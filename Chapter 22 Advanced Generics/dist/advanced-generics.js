"use strict";
// 1. Generic Function
function identity(value) {
    return value;
}
console.log("1. Generic Function:");
console.log(identity("TypeScript"));
console.log(identity(100));
// 2. Multiple Generic Parameters
function pair(first, second) {
    return [first, second];
}
console.log("\n2. Multiple Generic Parameters:");
console.log(pair("Age", 21));
console.log(pair(true, "Active"));
// 3. Generic Constraints
function getLength(value) {
    return value.length;
}
console.log("\n3. Generic Constraints:");
console.log(getLength("TypeScript"));
console.log(getLength([10, 20, 30]));
// 4. keyof with Generics
function getProperty(object, key) {
    return object[key];
}
const student = {
    name: "Rahul",
    age: 21,
    course: "B.Com"
};
console.log("\n4. keyof with Generics:");
console.log(getProperty(student, "name"));
console.log(getProperty(student, "age"));
const response = {
    success: true,
    data: "User created",
    message: "Success"
};
console.log("\n5. Generic Interface:");
console.log(response);
// 6. Generic Class
class storage {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const numberStorage = new storage();
numberStorage.add(10);
numberStorage.add(20);
console.log("\n6. Generic Class:");
console.log(numberStorage.getAll());
const textResult = {
    data: "Completed"
};
const numberResult = {
    data: 100
};
console.log("\n7. Default Generic Type:");
console.log(textResult);
console.log(numberResult);
const textBox = {
    value: "Hello"
};
const numberBox = {
    value: 500
};
console.log("\n8. Generic Type Alias:");
console.log(textBox);
console.log(numberBox);
const stringMessage = "String Type";
const numberMessage = "Other Type";
console.log("\n9. Conditional Types:");
console.log(stringMessage);
console.log(numberMessage);
const functionResult = 200;
console.log("\n10. infer Keyword:");
console.log(functionResult);
function displayUser(user) {
    console.log("User ID:", user.id);
    console.log("User Name:", user.name);
}
console.log("\n11. Multiple Property Constraints:");
displayUser({
    id: 1,
    name: "Aditya",
    course: "B.Com"
});
const productResponse = {
    status: 200,
    success: true,
    data: [
        { id: 1, name: "Laptop", price: 45000 },
        { id: 2, name: "Mouse", price: 500 },
        { id: 3, name: "Keyboard", price: 1200 }
    ]
};
console.log("\n12. Product API Response:");
productResponse.data.forEach((product) => {
    console.log(product.id, product.name, product.price);
});
// output
// 1. Generic Function:
// TypeScript
// 100
// 2. Multiple Generic Parameters:
// [ 'Age', 21 ]
// [ true, 'Active' ]
// 3. Generic Constraints:
// 10
// 3
// 4. keyof with Generics:
// Rahul
// 21
// 5. Generic Interface:
// { success: true, data: 'User created', message: 'Success' }
// 6. Generic Class:
// [ 10, 20 ]
// 7. Default Generic Type:
// { data: 'Completed' }
// { data: 100 }
// 8. Generic Type Alias:
// { value: 'Hello' }
// { value: 500 }
// 9. Conditional Types:
// String Type
// Other Type
// 10. infer Keyword:
// 200
// 11. Multiple Property Constraints:
// User ID: 1
// User Name: Aditya
// 12. Product API Response:
// 1 Laptop 45000
// 2 Mouse 500
// 3 Keyboard 1200
