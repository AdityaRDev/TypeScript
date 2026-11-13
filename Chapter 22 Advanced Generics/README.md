# Chapter 22: Advanced Generics

## 1. Introduction

Generics allow us to create reusable components, functions, interfaces, and classes that work with different data types.

Advanced Generics provide additional features such as constraints, default types, multiple type parameters, conditional types, and generic utility patterns.

## 2. Generic Functions

A generic function can accept different data types while maintaining type safety.

**Example:**

```typescript
function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(100));
console.log(identity<boolean>(true));
```

**Output:**

```text
Hello
100
true
```

Here, `T` represents a type that is decided when the function is called.

TypeScript can also automatically detect the type:

```typescript
identity("Hello");
identity(100);
```

## 3. Multiple Generic Type Parameters

A function can use multiple generic types.

**Example:**

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result1 = pair<string, number>("Age", 21);
const result2 = pair<boolean, string>(true, "Active");

console.log(result1);
console.log(result2);
```

**Output:**

```text
[ 'Age', 21 ]
[ true, 'Active' ]
```

Here:
- `T` represents the first type.
- `U` represents the second type.

## 4. Generic Constraints

Generic constraints restrict which types can be passed to a generic function.

The `extends` keyword is used to define a constraint.

**Example:**

```typescript
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

console.log(getLength("TypeScript"));
console.log(getLength([10, 20, 30]));
```

**Output:**

```text
10
3
```

The function accepts values that have a `length` property.

A number cannot be passed because numbers do not have a `length` property.

## 5. Using keyof with Generics

The `keyof` operator creates a union of the property names of an object type.

It is useful when accessing object properties safely.

**Example:**

```typescript
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

console.log(getProperty(student, "name"));
console.log(getProperty(student, "age"));
```

**Output:**

```text
Rahul
21
```

Here:
- `keyof T` represents the keys of an object.
- `K extends keyof T` restricts the key to valid properties.
- `T[K]` represents the type of the selected property.

## 6. Generic Interfaces

Generic interfaces allow an interface to work with different data types.

**Example:**

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

const userResponse: ApiResponse<string> = {
    success: true,
    data: "User created",
    message: "Success"
};

console.log(userResponse);
```

The same interface can represent different response data types.

## 7. Generic Classes

Generic classes can work with different data types.

**Example:**

```typescript
class Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

const numberStorage = new Storage<number>();

numberStorage.add(10);
numberStorage.add(20);

console.log(numberStorage.getAll());
```

**Output:**

```text
[ 10, 20 ]
```

## 8. Default Generic Types

We can provide a default type for a generic parameter.

**Example:**

```typescript
interface Result<T = string> {
    data: T;
}

const result1: Result = {
    data: "Completed"
};

const result2: Result<number> = {
    data: 100
};

console.log(result1.data);
console.log(result2.data);
```

If no type is provided, TypeScript uses the default type.

## 9. Generic Type Aliases

Type aliases can also use generics.

**Example:**

```typescript
type Box<T> = {
    value: T;
};

const textBox: Box<string> = {
    value: "Hello"
};

const numberBox: Box<number> = {
    value: 500
};
```

A generic type alias helps create reusable object structures.

## 10. Conditional Types with Generics

Conditional types select a type based on a condition.

Syntax:

```typescript
type Result<T> = T extends string ? "Text" : "Other";
```

**Example:**

```typescript
type CheckType<T> =
    T extends string ? "String Type" : "Other Type";

type A = CheckType<string>;
type B = CheckType<number>;
```

Here:
- `A` becomes `"String Type"`.
- `B` becomes `"Other Type"`.

## 11. The infer Keyword

The `infer` keyword allows TypeScript to infer a type inside a conditional type.

**Example:**

```typescript
type ReturnTypeOf<T> =
    T extends (...args: never[]) => infer R ? R : never;

type MyFunction = () => number;

type Output = ReturnTypeOf<MyFunction>;
```

Here, `Output` becomes `number`.

The `infer R` extracts the return type of the function.

## 12. Generic Constraints with Multiple Properties

A generic constraint can require an object to contain multiple properties.

**Example:**

```typescript
interface User {
    id: number;
    name: string;
}

function displayUser<T extends User>(user: T): void {
    console.log(user.id);
    console.log(user.name);
}

displayUser({
    id: 1,
    name: "Aditya",
    course: "B.Com"
});
```

The object must contain the required `id` and `name` properties. It can also contain additional properties.

## 13. Practical Example: Generic API Response

Generics are useful when working with API responses because the response structure can remain the same while the data type changes.

```typescript
interface ApiResult<T> {
    status: number;
    success: boolean;
    data: T;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

const productResponse: ApiResult<Product[]> = {
    status: 200,
    success: true,
    data: [
        { id: 1, name: "Laptop", price: 45000 },
        { id: 2, name: "Mouse", price: 500 }
    ]
};
```

The same `ApiResult` interface can be used for products, users, orders, or other data.

## 14. Important Points

- Generics make code reusable and type-safe.
- `T` is a common name for a generic type parameter.
- Multiple generic parameters can be used.
- `extends` creates generic constraints.
- `keyof` provides the keys of an object type.
- `T[K]` accesses the type of a selected property.
- Generic interfaces and classes support reusable structures.
- Default generic types provide fallback types.
- Conditional types select types based on conditions.
- `infer` extracts types inside conditional types.

## 15. Practice Tasks

1. Create a generic function that returns the first item from an array.
2. Create a generic function that accepts two different types and returns them as a tuple.
3. Create a generic function that accepts only values containing a `length` property.
4. Create a generic interface for an API response.
5. Create a generic class for storing product information.
6. Use `keyof` to create a function that safely reads an object property.
7. Create a conditional type that checks whether a type is a string or number.
8. Create a generic type alias for a response containing an array of items.

