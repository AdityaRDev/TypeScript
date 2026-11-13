// 1. Generic Function
function identity<T>(value: T): T {
    return value;
}
console.log("1. Generic Function:");
console.log(identity<string>("TypeScript"));
console.log(identity<number>(100));


// 2. Multiple Generic Parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
console.log("\n2. Multiple Generic Parameters:");
console.log(pair<string, number>("Age", 21));
console.log(pair<boolean, string>(true, "Active"));


// 3. Generic Constraints
function getLength<T extends { length: number }>(
    value: T
): number {
    return value.length;
}
console.log("\n3. Generic Constraints:");
console.log(getLength("TypeScript"));
console.log(getLength([10, 20, 30]));


// 4. keyof with Generics
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
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


// 5. Generic Interface
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}
const response: ApiResponse<string> = {
    success: true,
    data: "User created",
    message: "Success"
};
console.log("\n5. Generic Interface:");
console.log(response);


// 6. Generic Class
class storage<T> {
    private items: T[] = [];
    add(item: T): void {
        this.items.push(item);
    }
    getAll(): T[] {
        return this.items;
    }
}
const numberStorage = new storage<number>();
numberStorage.add(10);
numberStorage.add(20);
console.log("\n6. Generic Class:");
console.log(numberStorage.getAll());


// 7. Default Generic Type
interface Result<T = string> {
    data: T;
}
const textResult: Result = {
    data: "Completed"
};
const numberResult: Result<number> = {
    data: 100
};
console.log("\n7. Default Generic Type:");
console.log(textResult);
console.log(numberResult);


// 8. Generic Type Alias
type Box<T> = {
    value: T;
};
const textBox: Box<string> = {
    value: "Hello"
};
const numberBox: Box<number> = {
    value: 500
};
console.log("\n8. Generic Type Alias:");
console.log(textBox);
console.log(numberBox);


// 9. Conditional Types
type CheckType<T> =
    T extends string ? "String Type" : "Other Type";
type StringCheck = CheckType<string>;
type NumberCheck = CheckType<number>;
const stringMessage: StringCheck = "String Type";
const numberMessage: NumberCheck = "Other Type";
console.log("\n9. Conditional Types:");
console.log(stringMessage);
console.log(numberMessage);


// 10. infer Keyword
type ReturnTypeOf<T> =
    T extends (...args: never[]) => infer R ? R : never;
type MyFunction = () => number;
type FunctionOutput = ReturnTypeOf<MyFunction>;
const functionResult: FunctionOutput = 200;
console.log("\n10. infer Keyword:");
console.log(functionResult);


// 11. Multiple Property Constraints
interface User {
    id: number;
    name: string;
}
function displayUser<T extends User>(user: T): void {
    console.log("User ID:", user.id);
    console.log("User Name:", user.name);
}
console.log("\n11. Multiple Property Constraints:");
displayUser({
    id: 1,
    name: "Aditya",
    course: "B.Com"
});


// 12. Practical Example: Product API

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ApiResult<T> {
    status: number;
    success: boolean;
    data: T;
}

const productResponse: ApiResult<Product[]> = {
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
    console.log(
        product.id,
        product.name,
        product.price
    );
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