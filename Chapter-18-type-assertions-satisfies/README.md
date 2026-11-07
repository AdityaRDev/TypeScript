# Chapter 18: Type Assertions & `satisfies`

## Learning Objectives

In this chapter, you will learn:

- What type assertions are.
- Why type assertions are useful.
- How to use the `as` keyword.
- Angle-bracket type assertion syntax.
- Type assertions with objects and arrays.
- Type assertions with DOM elements.
- Type assertions with `unknown`.
- Double type assertions.
- Non-null assertion operator (`!`).
- Const assertions (`as const`).
- The `satisfies` operator.
- Difference between type annotations, assertions, and `satisfies`.
- Best practices for safe type assertions.

---

## 1. What Is a Type Assertion?

A **type assertion** tells TypeScript to treat a value as a particular type.

It is useful when you know more about a value than TypeScript can determine from the available information.

Example:

```typescript
let value: unknown = "Hello TypeScript";

let message = value as string;

console.log(message.toUpperCase());
```

### Output

```text
HELLO TYPESCRIPT
```

Here, `value as string` tells TypeScript to treat the value as a string.

**Important:** A type assertion does not convert a value or perform runtime validation. It only affects TypeScript's compile-time type checking.

---

## 2. The `as` Keyword

The `as` keyword is the most commonly used syntax for type assertions.

### Syntax

```typescript
value as Type
```

Example:

```typescript
let data: unknown = 100;

let numberValue = data as number;

console.log(numberValue.toFixed(2));
```

### Output

```text
100.00
```

The assertion does not convert the value into a number. It tells the compiler to treat it as one.

---

## 3. Type Assertions with Variables

We can use assertions with variables when we know their actual types.

```typescript
let input: unknown = "TypeScript";

let text = input as string;

console.log(text.length);
console.log(text.toUpperCase());
```

### Output

```text
10
TYPESCRIPT
```

Without the assertion or another type check, TypeScript does not allow string-specific operations on an `unknown` value.

---

## 4. Angle-Bracket Assertion Syntax

TypeScript also supports angle-bracket syntax.

```typescript
let value: unknown = "Hello";

let message = <string>value;

console.log(message.toUpperCase());
```

This has the same compile-time effect as:

```typescript
let message = value as string;
```

**Important:** Avoid angle-bracket assertions in TSX files because JSX uses the same angle-bracket syntax.

Prefer `as` for consistency.

---

## 5. Type Assertions with Objects

Type assertions can be used with objects.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

let data: unknown = {
    id: 101,
    name: "Aditya",
    email: "aditya@example.com"
};

let user = data as User;

console.log(user.name);
console.log(user.email);
```

### Output

```text
Aditya
aditya@example.com
```

**Important:** This assertion does not check whether the object actually contains all the required properties. Validate external data before trusting it.

---

## 6. Type Assertions with Arrays

We can assert that a value is an array of a particular type.

```typescript
let data: unknown = [10, 20, 30, 40];

let numbers = data as number[];

console.log(numbers[0]);
console.log(numbers.length);
```

### Output

```text
10
4
```

TypeScript trusts the assertion, but it does not verify the array's contents at runtime.

---

## 7. Type Assertions with DOM Elements

Type assertions are useful when working with HTML elements.

Consider this HTML:

```html
<input type="text" id="username">
```

TypeScript:

```typescript
const input = document.getElementById(
    "username"
) as HTMLInputElement;

input.value = "Aditya";

console.log(input.value);
```

Here:

- `getElementById()` returns `HTMLElement | null`.
- `as HTMLInputElement` tells TypeScript to treat the result as an input element.
- `value` is available on `HTMLInputElement`.

**Important:** The assertion does not check whether the element exists. Always handle the possibility of `null`.

Safer approach:

```typescript
const input = document.getElementById("username");

if (input instanceof HTMLInputElement) {
    input.value = "Aditya";
}
```

This performs a runtime check and narrows the type safely.

---

## 8. Type Assertions with `unknown`

The `unknown` type is often used when data comes from an external source.

Example:

```typescript
function displayUser(data: unknown): void {
    const user = data as {
        name: string;
        age: number;
    };

    console.log(user.name);
    console.log(user.age);
}
```

This compiles, but the assertion alone does not guarantee that the input is valid.

### Safer Approach: Type Narrowing

```typescript
function displayUser(data: unknown): void {
    if (
        typeof data === "object" &&
        data !== null &&
        "name" in data &&
        "age" in data &&
        typeof data.name === "string" &&
        typeof data.age === "number"
    ) {
        console.log(data.name);
        console.log(data.age);
    } else {
        console.log("Invalid user data");
    }
}
```

Type narrowing checks the actual value before accessing its properties.

---

## 9. Double Type Assertions

Sometimes TypeScript does not allow a direct assertion between two unrelated types.

A double assertion passes through `unknown`.

```typescript
let value = "Hello";

let result = value as unknown as number;
```

This compiles, but the runtime value is still a string.

```typescript
console.log(typeof result);
```

### Output

```text
string
```

**Important:** Double assertions can bypass useful compiler checks. Avoid them unless you have a strong reason and understand the runtime value.

---

## 10. Non-Null Assertion Operator (`!`)

The non-null assertion operator tells TypeScript that a value is not `null` or `undefined`.

Example:

```typescript
let username: string | null = "Aditya";

console.log(username!.toUpperCase());
```

### Output

```text
ADITYA
```

The `!` operator removes `null` and `undefined` from the type for that expression.

### Another Example

```typescript
const element = document.getElementById("app")!;

console.log(element.id);
```

**Important:** The operator does not check the value at runtime. If the element does not exist, the code can still fail.

### Safer Alternative

```typescript
const element = document.getElementById("app");

if (element !== null) {
    console.log(element.id);
}
```

Prefer checking the value instead of using `!` unnecessarily.

---

## 11. Const Assertions (`as const`)

A const assertion preserves literal types and makes object properties and array elements readonly.

### Without `as const`

```typescript
let user = {
    name: "Aditya",
    role: "Admin"
};
```

The inferred property types are generally `string`.

### With `as const`

```typescript
const user = {
    name: "Aditya",
    role: "Admin"
} as const;
```

Now the properties have literal types:

```typescript
// name: "Aditya"
// role: "Admin"
```

We cannot reassign these properties:

```typescript
// user.name = "Alex"; // Error
// user.role = "User"; // Error
```

### Const Assertion with Arrays

```typescript
const colors = ["Red", "Green", "Blue"] as const;
```

The inferred type is:

```typescript
readonly ["Red", "Green", "Blue"]
```

The array becomes a readonly tuple containing literal types.

---

## 12. What Is the `satisfies` Operator?

The `satisfies` operator checks whether an expression is compatible with a particular type without simply replacing the expression's inferred type with that target type.

It was introduced in TypeScript 4.9.

Example:

```typescript
type UserConfig = {
    name: string;
    age: number;
    active: boolean;
};

const user = {
    name: "Aditya",
    age: 21,
    active: true
} satisfies UserConfig;
```

Here, TypeScript checks that the object satisfies `UserConfig`.

If a required property is missing or a property has an incompatible type, TypeScript reports an error.

---

## 13. Type Annotation vs Type Assertion vs `satisfies`

These three concepts are different.

### A. Type Annotation

```typescript
type Config = {
    theme: "light" | "dark";
};

const config: Config = {
    theme: "dark"
};
```

The variable is declared with the type `Config`.

### B. Type Assertion

```typescript
const config = {
    theme: "dark"
} as Config;
```

You tell TypeScript to treat the expression as `Config`.

This can bypass some useful checks, so it should be used carefully.

### C. `satisfies`

```typescript
const config = {
    theme: "dark"
} satisfies Config;
```

TypeScript checks compatibility while retaining more specific inferred information where applicable.

### Comparison

| Feature | Annotation | Assertion | `satisfies` |
|---|---|---|---|
| Checks compatibility | Yes | Does not validate the actual value | Yes |
| Changes declared variable type | Yes | Changes the expression's static type | Does not simply replace it with the target type |
| Runtime conversion | No | No | No |
| Can bypass checks | No, normally | Yes | No |
| Useful for configuration | Yes | Less suitable | Very useful |

---

## 14. `satisfies` with Objects

```typescript
type Product = {
    id: number;
    name: string;
    price: number;
};

const product = {
    id: 101,
    name: "Laptop",
    price: 50000
} satisfies Product;

console.log(product.name);
console.log(product.price);
```

The object is checked against the `Product` structure.

---

## 15. `satisfies` with Arrays

```typescript
type Role = "Admin" | "User" | "Guest";

const roles = [
    "Admin",
    "User",
    "Guest"
] satisfies Role[];

console.log(roles);
```

If you add an invalid role, TypeScript reports an error.

```typescript
const roles = [
    "Admin",
    "User",
    "SuperAdmin"
] satisfies Role[]; // Error
```

---

## 16. `satisfies` with Configuration Objects

This is one of the most useful real-world applications.

```typescript
type AppConfig = {
    appName: string;
    version: number;
    environment: "development" | "production";
    debug: boolean;
};

const config = {
    appName: "LinguaAI",
    version: 1,
    environment: "production",
    debug: false
} satisfies AppConfig;

console.log(config.appName);
console.log(config.environment);
```

TypeScript checks the configuration against `AppConfig` while preserving useful inferred information.

**Note:** `satisfies` is a compile-time check, not runtime validation. If configuration comes from JSON, an API, or user input, validate it at runtime too.

---

## 17. Best Practices

- Use `as` only when you have reliable information about the value's type.
- Prefer type narrowing over unnecessary assertions.
- Never assume that a type assertion validates external data.
- Use `unknown` instead of `any` for uncertain values.
- Avoid unnecessary double assertions.
- Use the non-null assertion operator carefully.
- Prefer `as` over angle-bracket assertions in general.
- Use `as const` when literal values and readonly properties are useful.
- Use `satisfies` to validate configuration objects and other typed expressions.
- Remember that assertions and `satisfies` do not perform runtime checks.

---

## 18. Practice Tasks

### Task 1: Basic Type Assertion

Create an `unknown` variable containing a string.

Use `as string` and display:

- Uppercase string.
- String length.
- First character.

### Task 2: Object Assertion

Create a `Product` interface containing:

- `id`
- `name`
- `price`

Create an `unknown` object and use a type assertion to access its properties.

Then explain why an assertion does not validate the object.

### Task 3: DOM Assertion

Create an HTML input with ID `email`.

Use `getElementById()` and an assertion to access its value.

Then rewrite the code using `instanceof HTMLInputElement` for safe checking.

### Task 4: Const Assertion

Create an object containing:

- `name`
- `role`
- `active`

Use `as const` and try changing its properties.

Observe the TypeScript errors.

### Task 5: `satisfies` Challenge

Create a configuration type:

```typescript
type AppConfig = {
    name: string;
    port: number;
    environment: "development" | "production";
};
```

Create a valid configuration object using `satisfies`.

Then intentionally add an invalid property value and observe the compiler error.

### Advanced Challenge

Create a type-safe product configuration using:

- `as const`
- `keyof`
- `typeof`
- `satisfies`

Extract a union of product names from the configuration object.

---

## Important Points

- Type assertions tell TypeScript how to treat a value.
- The `as` keyword is the common assertion syntax.
- Angle-bracket assertions are another supported syntax, but are unsuitable for TSX.
- Assertions do not convert values at runtime.
- `unknown` requires narrowing or assertion before use.
- Double assertions can bypass compiler checks.
- `!` removes null and undefined from the static type for an expression.
- `as const` preserves literal types and creates readonly properties or tuples.
- `satisfies` checks compatibility while preserving useful inferred information.
- Runtime validation is still necessary for untrusted external data.

---

## Chapter Status

**Status:** Completed

**Next Chapter:** Chapter 19 — `null`, `undefined` & Strict Type Checking# Chapter 18: Type Assertions & `satisfies`

## Learning Objectives

In this chapter, you will learn:

- What type assertions are.
- Why type assertions are useful.
- How to use the `as` keyword.
- Angle-bracket type assertion syntax.
- Type assertions with objects and arrays.
- Type assertions with DOM elements.
- Type assertions with `unknown`.
- Double type assertions.
- Non-null assertion operator (`!`).
- Const assertions (`as const`).
- The `satisfies` operator.
- Difference between type annotations, assertions, and `satisfies`.
- Best practices for safe type assertions.

---

## 1. What Is a Type Assertion?

A **type assertion** tells TypeScript to treat a value as a particular type.

It is useful when you know more about a value than TypeScript can determine from the available information.

Example:

```typescript
let value: unknown = "Hello TypeScript";

let message = value as string;

console.log(message.toUpperCase());
```

### Output

```text
HELLO TYPESCRIPT
```

Here, `value as string` tells TypeScript to treat the value as a string.

**Important:** A type assertion does not convert a value or perform runtime validation. It only affects TypeScript's compile-time type checking.

---

## 2. The `as` Keyword

The `as` keyword is the most commonly used syntax for type assertions.

### Syntax

```typescript
value as Type
```

Example:

```typescript
let data: unknown = 100;

let numberValue = data as number;

console.log(numberValue.toFixed(2));
```

### Output

```text
100.00
```

The assertion does not convert the value into a number. It tells the compiler to treat it as one.

---

## 3. Type Assertions with Variables

We can use assertions with variables when we know their actual types.

```typescript
let input: unknown = "TypeScript";

let text = input as string;

console.log(text.length);
console.log(text.toUpperCase());
```

### Output

```text
10
TYPESCRIPT
```

Without the assertion or another type check, TypeScript does not allow string-specific operations on an `unknown` value.

---

## 4. Angle-Bracket Assertion Syntax

TypeScript also supports angle-bracket syntax.

```typescript
let value: unknown = "Hello";

let message = <string>value;

console.log(message.toUpperCase());
```

This has the same compile-time effect as:

```typescript
let message = value as string;
```

**Important:** Avoid angle-bracket assertions in TSX files because JSX uses the same angle-bracket syntax.

Prefer `as` for consistency.

---

## 5. Type Assertions with Objects

Type assertions can be used with objects.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

let data: unknown = {
    id: 101,
    name: "Aditya",
    email: "aditya@example.com"
};

let user = data as User;

console.log(user.name);
console.log(user.email);
```

### Output

```text
Aditya
aditya@example.com
```

**Important:** This assertion does not check whether the object actually contains all the required properties. Validate external data before trusting it.

---

## 6. Type Assertions with Arrays

We can assert that a value is an array of a particular type.

```typescript
let data: unknown = [10, 20, 30, 40];

let numbers = data as number[];

console.log(numbers[0]);
console.log(numbers.length);
```

### Output

```text
10
4
```

TypeScript trusts the assertion, but it does not verify the array's contents at runtime.

---

## 7. Type Assertions with DOM Elements

Type assertions are useful when working with HTML elements.

Consider this HTML:

```html
<input type="text" id="username">
```

TypeScript:

```typescript
const input = document.getElementById(
    "username"
) as HTMLInputElement;

input.value = "Aditya";

console.log(input.value);
```

Here:

- `getElementById()` returns `HTMLElement | null`.
- `as HTMLInputElement` tells TypeScript to treat the result as an input element.
- `value` is available on `HTMLInputElement`.

**Important:** The assertion does not check whether the element exists. Always handle the possibility of `null`.

Safer approach:

```typescript
const input = document.getElementById("username");

if (input instanceof HTMLInputElement) {
    input.value = "Aditya";
}
```

This performs a runtime check and narrows the type safely.

---

## 8. Type Assertions with `unknown`

The `unknown` type is often used when data comes from an external source.

Example:

```typescript
function displayUser(data: unknown): void {
    const user = data as {
        name: string;
        age: number;
    };

    console.log(user.name);
    console.log(user.age);
}
```

This compiles, but the assertion alone does not guarantee that the input is valid.

### Safer Approach: Type Narrowing

```typescript
function displayUser(data: unknown): void {
    if (
        typeof data === "object" &&
        data !== null &&
        "name" in data &&
        "age" in data &&
        typeof data.name === "string" &&
        typeof data.age === "number"
    ) {
        console.log(data.name);
        console.log(data.age);
    } else {
        console.log("Invalid user data");
    }
}
```

Type narrowing checks the actual value before accessing its properties.

---

## 9. Double Type Assertions

Sometimes TypeScript does not allow a direct assertion between two unrelated types.

A double assertion passes through `unknown`.

```typescript
let value = "Hello";

let result = value as unknown as number;
```

This compiles, but the runtime value is still a string.

```typescript
console.log(typeof result);
```

### Output

```text
string
```

**Important:** Double assertions can bypass useful compiler checks. Avoid them unless you have a strong reason and understand the runtime value.

---

## 10. Non-Null Assertion Operator (`!`)

The non-null assertion operator tells TypeScript that a value is not `null` or `undefined`.

Example:

```typescript
let username: string | null = "Aditya";

console.log(username!.toUpperCase());
```

### Output

```text
ADITYA
```

The `!` operator removes `null` and `undefined` from the type for that expression.

### Another Example

```typescript
const element = document.getElementById("app")!;

console.log(element.id);
```

**Important:** The operator does not check the value at runtime. If the element does not exist, the code can still fail.

### Safer Alternative

```typescript
const element = document.getElementById("app");

if (element !== null) {
    console.log(element.id);
}
```

Prefer checking the value instead of using `!` unnecessarily.

---

## 11. Const Assertions (`as const`)

A const assertion preserves literal types and makes object properties and array elements readonly.

### Without `as const`

```typescript
let user = {
    name: "Aditya",
    role: "Admin"
};
```

The inferred property types are generally `string`.

### With `as const`

```typescript
const user = {
    name: "Aditya",
    role: "Admin"
} as const;
```

Now the properties have literal types:

```typescript
// name: "Aditya"
// role: "Admin"
```

We cannot reassign these properties:

```typescript
// user.name = "Alex"; // Error
// user.role = "User"; // Error
```

### Const Assertion with Arrays

```typescript
const colors = ["Red", "Green", "Blue"] as const;
```

The inferred type is:

```typescript
readonly ["Red", "Green", "Blue"]
```

The array becomes a readonly tuple containing literal types.

---

## 12. What Is the `satisfies` Operator?

The `satisfies` operator checks whether an expression is compatible with a particular type without simply replacing the expression's inferred type with that target type.

It was introduced in TypeScript 4.9.

Example:

```typescript
type UserConfig = {
    name: string;
    age: number;
    active: boolean;
};

const user = {
    name: "Aditya",
    age: 21,
    active: true
} satisfies UserConfig;
```

Here, TypeScript checks that the object satisfies `UserConfig`.

If a required property is missing or a property has an incompatible type, TypeScript reports an error.

---

## 13. Type Annotation vs Type Assertion vs `satisfies`

These three concepts are different.

### A. Type Annotation

```typescript
type Config = {
    theme: "light" | "dark";
};

const config: Config = {
    theme: "dark"
};
```

The variable is declared with the type `Config`.

### B. Type Assertion

```typescript
const config = {
    theme: "dark"
} as Config;
```

You tell TypeScript to treat the expression as `Config`.

This can bypass some useful checks, so it should be used carefully.

### C. `satisfies`

```typescript
const config = {
    theme: "dark"
} satisfies Config;
```

TypeScript checks compatibility while retaining more specific inferred information where applicable.

### Comparison

| Feature | Annotation | Assertion | `satisfies` |
|---|---|---|---|
| Checks compatibility | Yes | Does not validate the actual value | Yes |
| Changes declared variable type | Yes | Changes the expression's static type | Does not simply replace it with the target type |
| Runtime conversion | No | No | No |
| Can bypass checks | No, normally | Yes | No |
| Useful for configuration | Yes | Less suitable | Very useful |

---

## 14. `satisfies` with Objects

```typescript
type Product = {
    id: number;
    name: string;
    price: number;
};

const product = {
    id: 101,
    name: "Laptop",
    price: 50000
} satisfies Product;

console.log(product.name);
console.log(product.price);
```

The object is checked against the `Product` structure.

---

## 15. `satisfies` with Arrays

```typescript
type Role = "Admin" | "User" | "Guest";

const roles = [
    "Admin",
    "User",
    "Guest"
] satisfies Role[];

console.log(roles);
```

If you add an invalid role, TypeScript reports an error.

```typescript
const roles = [
    "Admin",
    "User",
    "SuperAdmin"
] satisfies Role[]; // Error
```

---

## 16. `satisfies` with Configuration Objects

This is one of the most useful real-world applications.

```typescript
type AppConfig = {
    appName: string;
    version: number;
    environment: "development" | "production";
    debug: boolean;
};

const config = {
    appName: "LinguaAI",
    version: 1,
    environment: "production",
    debug: false
} satisfies AppConfig;

console.log(config.appName);
console.log(config.environment);
```

TypeScript checks the configuration against `AppConfig` while preserving useful inferred information.

**Note:** `satisfies` is a compile-time check, not runtime validation. If configuration comes from JSON, an API, or user input, validate it at runtime too.

---

## 17. Best Practices

- Use `as` only when you have reliable information about the value's type.
- Prefer type narrowing over unnecessary assertions.
- Never assume that a type assertion validates external data.
- Use `unknown` instead of `any` for uncertain values.
- Avoid unnecessary double assertions.
- Use the non-null assertion operator carefully.
- Prefer `as` over angle-bracket assertions in general.
- Use `as const` when literal values and readonly properties are useful.
- Use `satisfies` to validate configuration objects and other typed expressions.
- Remember that assertions and `satisfies` do not perform runtime checks.

---

## 18. Practice Tasks

### Task 1: Basic Type Assertion

Create an `unknown` variable containing a string.

Use `as string` and display:

- Uppercase string.
- String length.
- First character.

### Task 2: Object Assertion

Create a `Product` interface containing:

- `id`
- `name`
- `price`

Create an `unknown` object and use a type assertion to access its properties.

Then explain why an assertion does not validate the object.

### Task 3: DOM Assertion

Create an HTML input with ID `email`.

Use `getElementById()` and an assertion to access its value.

Then rewrite the code using `instanceof HTMLInputElement` for safe checking.

### Task 4: Const Assertion

Create an object containing:

- `name`
- `role`
- `active`

Use `as const` and try changing its properties.

Observe the TypeScript errors.

### Task 5: `satisfies` Challenge

Create a configuration type:

```typescript
type AppConfig = {
    name: string;
    port: number;
    environment: "development" | "production";
};
```

Create a valid configuration object using `satisfies`.

Then intentionally add an invalid property value and observe the compiler error.

### Advanced Challenge

Create a type-safe product configuration using:

- `as const`
- `keyof`
- `typeof`
- `satisfies`

Extract a union of product names from the configuration object.

---

## Important Points

- Type assertions tell TypeScript how to treat a value.
- The `as` keyword is the common assertion syntax.
- Angle-bracket assertions are another supported syntax, but are unsuitable for TSX.
- Assertions do not convert values at runtime.
- `unknown` requires narrowing or assertion before use.
- Double assertions can bypass compiler checks.
- `!` removes null and undefined from the static type for an expression.
- `as const` preserves literal types and creates readonly properties or tuples.
- `satisfies` checks compatibility while preserving useful inferred information.
- Runtime validation is still necessary for untrusted external data.

---
