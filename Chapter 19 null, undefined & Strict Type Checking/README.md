# Chapter 19: null, undefined & Strict Type Checking

## Learning Objectives

After completing this chapter, you will understand:

- What `null` and `undefined` mean.
- The difference between `null` and `undefined`.
- How to use union types with `null` and `undefined`.
- What `strictNullChecks` does.
- How to handle optional properties.
- How to use optional chaining (`?.`).
- How to use nullish coalescing (`??`).
- How to use non-null assertion (`!`) carefully.
- How strict type checking improves code safety.

---

## 1. Introduction

In JavaScript, a variable may sometimes have no value.

TypeScript provides two types to represent missing values:

- `null`
- `undefined`

These values are different, and TypeScript helps us handle them safely.

Example:

```ts
let username: string | null = "Aditya";

username = null;

console.log(username);
```

Output:

```text
null
```

The union type `string | null` means the variable can contain either a string or `null`.

---

## 2. What is undefined?

`undefined` means a value has not been assigned or is unavailable.

Example:

```ts
let username: string | undefined;

console.log(username);
```

Output:

```text
undefined
```

Another example:

```ts
let age: number | undefined = 21;

age = undefined;

console.log(age);
```

Output:

```text
undefined
```

### When can undefined occur?

- A variable is declared but not initialized.
- An optional object property is not provided.
- A function does not return a value.
- An array or object lookup does not find a value.

Example:

```ts
function displayMessage(): void {
    console.log("Hello TypeScript");
}

const result = displayMessage();

console.log(result);
```

Output:

```text
Hello TypeScript
undefined
```

A function with a `void` return type does not provide a useful return value.

---

## 3. What is null?

`null` represents an intentionally empty value.

Example:

```ts
let selectedUser: string | null = null;

console.log(selectedUser);
```

Output:

```text
null
```

You can later assign a value:

```ts
selectedUser = "Aditya";

console.log(selectedUser);
```

Output:

```text
Aditya
```

### Difference between null and undefined

| null | undefined |
|---|---|
| Represents an intentionally empty value | Represents a missing or unassigned value |
| Usually assigned explicitly | Often occurs automatically |
| Must be included in the type when strict null checking is enabled | Must be included in the type when strict null checking is enabled |

Example:

```ts
let firstName: string | null = null;

let lastName: string | undefined = undefined;
```

---

## 4. Using Union Types with null and undefined

A union type allows a variable to store more than one type of value.

Example:

```ts
let username: string | null;

username = "Aditya";
username = null;
```

A variable can also accept both missing-value types:

```ts
let email: string | null | undefined;

email = "aditya@example.com";
email = null;
email = undefined;
```

This is useful when working with optional data from forms, APIs, or databases.

---

## 5. What is strictNullChecks?

`strictNullChecks` is a TypeScript compiler option.

It checks whether a value might be `null` or `undefined` before allowing operations on that value.

When strict null checking is enabled, `null` and `undefined` cannot automatically be assigned to ordinary types such as `string` and `number`.

Example:

```ts
let username: string = "Aditya";

// Error
// username = null;

// Error
// username = undefined;
```

To allow these values, use union types:

```ts
let username: string | null = "Aditya";

username = null;
```

### Enabling strictNullChecks

In `tsconfig.json`:

```json
{
    "compilerOptions": {
        "strictNullChecks": true
    }
}
```

When you use:

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`strictNullChecks` is enabled automatically.

---

## 6. Checking null and undefined

Before using a value that may be missing, check it.

Example:

```ts
function printUsername(username: string | null): void {

    if (username !== null) {
        console.log(username.toUpperCase());
    } else {
        console.log("Username is not available");
    }
}

printUsername("Aditya");
printUsername(null);
```

Output:

```text
ADITYA
Username is not available
```

TypeScript understands that `username` is a string inside the `if` block.

This process is called type narrowing.

### Checking both null and undefined

```ts
function displayEmail(email: string | null | undefined): void {

    if (email !== null && email !== undefined) {
        console.log(email.toUpperCase());
    } else {
        console.log("Email is missing");
    }
}

displayEmail("aditya@example.com");
displayEmail(null);
displayEmail(undefined);
```

Output:

```text
ADITYA@EXAMPLE.COM
Email is missing
Email is missing
```

You can also use:

```ts
if (email != null) {
    console.log(email.toUpperCase());
}
```

The loose comparison `!= null` checks for both `null` and `undefined`.

---

## 7. Optional Properties

An optional property is a property that does not have to be provided when creating an object.

The `?` symbol makes a property optional.

Example:

```ts
interface Student {
    name: string;
    age?: number;
}

const student1: Student = {
    name: "Aditya",
    age: 21
};

const student2: Student = {
    name: "Rahul"
};

console.log(student1);
console.log(student2);
```

Output:

```text
{ name: 'Aditya', age: 21 }
{ name: 'Rahul' }
```

The `age` property is optional, so it may be missing.

When you read `student2.age`, its type is `number | undefined`.

Example:

```ts
if (student2.age !== undefined) {
    console.log(student2.age);
} else {
    console.log("Age is not provided");
}
```

---

## 8. Optional Chaining (?.)

Optional chaining allows you to access a property or method without causing an error when the value before `?.` is `null` or `undefined`.

Example:

```ts
interface User {
    name: string;
    address?: {
        city: string;
    };
}

const user: User = {
    name: "Aditya"
};

console.log(user.address?.city);
```

Output:

```text
undefined
```

Without optional chaining:

```ts
// This can cause a runtime error if address is undefined.
// console.log(user.address.city);
```

### Optional chaining with methods

```ts
const username: string | undefined = undefined;

console.log(username?.toUpperCase());
```

Output:

```text
undefined
```

Optional chaining is useful when working with nested objects and API responses.

---

## 9. Nullish Coalescing (??)

The nullish coalescing operator (`??`) provides a default value when the left side is `null` or `undefined`.

Example:

```ts
const username: string | null = null;

const result = username ?? "Guest";

console.log(result);
```

Output:

```text
Guest
```

### Difference between ?? and ||

The `||` operator uses the default value when the left side is any falsy value, such as:

- `0`
- `false`
- `""`
- `null`
- `undefined`

The `??` operator uses the default value only for `null` and `undefined`.

Example:

```ts
const age = 0;

console.log(age || 18);
console.log(age ?? 18);
```

Output:

```text
18
0
```

| `??`| `||` |

|---|---|

| Checks only null and undefined | Checks all falsy values |

| Preserves `0` | Replaces `0` |

| Preserves `false` | Replaces `false` |

| Preserves empty string | Replaces empty string |

---

## 10. Non-null Assertion Operator (!)

The non-null assertion operator (`!`) tells TypeScript that a value is not `null` or `undefined`.

Example:

```ts
const username: string | null = "Aditya";

console.log(username!.toUpperCase());
```

Output:

```text
ADITYA
```

However, if the value is actually `null`, the program can fail at runtime.

Example:

```ts
const username: string | null = null;

// Unsafe: this causes a runtime error.
// console.log(username!.toUpperCase());
```

**Important:** The `!` operator does not check the value. It only tells the TypeScript compiler to trust you.

Prefer checking the value with an `if` statement whenever possible.

---h34r7h36k3r

## 11. Strict Type Checking

Strict type checking helps find possible errors during development.

Example:

```ts
let age: number = 21;

// Error: string cannot be assigned to number.
// age = "Twenty";
```

Another example:

```ts
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

console.log(calculateTotal(100, 2));

// Error: arguments must be numbers.
// console.log(calculateTotal("100", 2));
```

### Common strict compiler options

| Option | Purpose |
|---|---|
| `strict` | Enables all strict type-checking options |
| `strictNullChecks` | Checks null and undefined |
| `noImplicitAny` | Reports parameters or variables that implicitly have any type |
| `strictFunctionTypes` | Checks function parameter types more strictly |
| `strictBindCallApply` | Checks types used with bind, call and apply |
| `strictPropertyInitialization` | Checks that class properties are initialized |
| `noImplicitThis` | Reports an implicitly typed this value |

You can enable all these strict options using:

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

---

## 12. Practical Example: Student Information System

This example handles student information when some details may be missing.

```ts
interface Student {
    id: number;
    name: string;
    email: string | null;
    phone?: string;
}

function displayStudent(student: Student): void {

    console.log("Student ID:", student.id);
    console.log("Student Name:", student.name);

    console.log(
        "Email:",
        student.email ?? "Email not available"
    );

    console.log(
        "Phone:",
        student.phone ?? "Phone not available"
    );
}

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

displayStudent(student1);

console.log("----------------");

displayStudent(student2);
```

Output:

```text
Student ID: 101
Student Name: Aditya
Email: aditya@example.com
Phone: 9876543210
----------------
Student ID: 102
Student Name: Rahul
Email: Email not available
Phone: Phone not available
```

### Concepts used

- Interface
- Optional properties
- Union types
- Null values
- Nullish coalescing
- Function parameters
- Strict type checking

---

## 13. Practice Tasks

Complete these tasks without copying the practical example.

### Task 1: User Information

Create a `User` interface with:

- `id` as number
- `name` as string
- `email` as string or null
- `phone` as an optional string

Create two user objects with different values.

### Task 2: Check Missing Values

Create a function that accepts `string | null | undefined`.

- Print the string in uppercase when available.
- Print "Value is missing" otherwise.

### Task 3: Optional Chaining

Create an object containing:

- User name
- Optional address
- City inside address

Use optional chaining to display the city.

### Task 4: Nullish Coalescing

Create a variable containing `0`.

Display its value using both `||` and `??`.

Explain the difference in the output.

### Task 5: Student Management

Create a function that displays student information.

Use optional properties and nullish coalescing to display default values when information is missing.

---

## 14. Important Points to Remember

- `null` represents an intentionally empty value.
- `undefined` represents an unassigned or unavailable value.
- Use union types when a variable can contain null or undefined.
- `strictNullChecks` checks null and undefined.
- `strict: true` enables strict type checking.
- Optional properties use the `?` symbol.
- Optional chaining uses `?.`.
- Nullish coalescing uses `??`.
- Non-null assertion uses `!`.
- Always prefer safe checks over unnecessary non-null assertions.



