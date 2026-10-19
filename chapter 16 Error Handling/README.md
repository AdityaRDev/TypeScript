# Chapter 16: Error Handling

## Learning Objectives

In this chapter, you will learn:

- What error handling is.
- How to use `try`, `catch`, and `finally`.
- How to throw errors using `throw`.
- How to work with the built-in `Error` class.
- How to create custom error classes.
- How to handle errors safely using `unknown`.
- How to handle errors in asynchronous functions and Promises.
- How to create reliable TypeScript applications.

---

## 1. What Is Error Handling?

**Error handling** is the process of detecting and managing errors that occur while a program is running.

Errors may occur because of:

- Invalid user input.
- Missing files or data.
- Network failures.
- Database connection problems.
- Invalid calculations or operations.

Example:

```typescript
const result = 10 / 0;

console.log(result);
```

JavaScript returns `Infinity` instead of throwing an error. Therefore, some situations need explicit validation rather than relying on exceptions.

---

## 2. The `try` Block

The `try` block contains code that might throw an error.

```typescript
try {
    console.log("Program started");
    throw new Error("Something went wrong");
}
```

A `try` block must be followed by a `catch` block, a `finally` block, or both.

---

## 3. The `catch` Block

The `catch` block handles an error thrown inside the associated `try` block.

```typescript
try {
    throw new Error("Something went wrong");
} catch (error: unknown) {
    console.log("An error occurred");
}
```

Using `unknown` is safer than using `any` because TypeScript requires us to check the error before accessing its properties.

### Checking an Error

```typescript
try {
    throw new Error("Invalid input");
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
```

The `instanceof Error` check allows TypeScript to recognize that `error` is an `Error` object.

---

## 4. The `finally` Block

The `finally` block executes whether the `try` block succeeds or throws an error, provided control reaches it.

```typescript
try {
    console.log("Processing data");
} catch (error: unknown) {
    console.log("Error occurred");
} finally {
    console.log("Operation completed");
}
```

**Use cases:**

- Releasing resources.
- Closing connections.
- Cleaning up temporary state.
- Performing operations that should happen after success or failure.

---

## 5. The `throw` Statement

The `throw` statement creates an exception and transfers control to an appropriate error handler.

```typescript
function checkAge(age: number): void {
    if (age < 18) {
        throw new Error("You must be at least 18");
    }

    console.log("Access granted");
}

checkAge(20);
```

If the age is less than 18, the function throws an error instead of continuing normally.

---

## 6. The Built-in `Error` Class

JavaScript provides the `Error` class to represent errors.

```typescript
const error = new Error("Something went wrong");

console.log(error.name);
console.log(error.message);
```

Common properties:

- `name` — the error type or name.
- `message` — a description of the error.
- `stack` — information about where the error occurred, when available.

Example:

```typescript
try {
    throw new Error("Database connection failed");
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.name);
        console.log(error.message);
    }
}
```

---

## 7. Creating Custom Error Classes

Custom error classes let us represent specific application errors.

```typescript
class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateUsername(username: string): void {
    if (username.length < 3) {
        throw new ValidationError(
            "Username must contain at least 3 characters"
        );
    }
}
```

Usage:

```typescript
try {
    validateUsername("Al");
} catch (error: unknown) {
    if (error instanceof ValidationError) {
        console.log("Validation:", error.message);
    } else if (error instanceof Error) {
        console.log("Error:", error.message);
    }
}
```

Custom errors are useful for validation, authentication, payment processing, and API failures.

---

## 8. Handling Different Errors

Use `instanceof` to distinguish between known error types.

```typescript
class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

function connectDatabase(): never {
    throw new DatabaseError("Database unavailable");
}

try {
    connectDatabase();
} catch (error: unknown) {
    if (error instanceof NetworkError) {
        console.log("Check your network");
    } else if (error instanceof DatabaseError) {
        console.log("Check your database connection");
    } else if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log("An unknown error occurred");
    }
}
```

---

## 9. Why Use `unknown` Instead of `any`?

The `any` type disables many TypeScript checks.

```typescript
let value: any = "Hello";

value.toFixed(); // TypeScript allows this
```

The `unknown` type requires a check before performing an operation.

```typescript
let value: unknown = "Hello";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

**Important:** Use `unknown` when you do not know the type of a value. Narrow it before accessing its properties or calling its methods.

---

## 10. Handling Errors in Functions

A function can validate input and throw an error if the input is invalid.

```typescript
function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}

try {
    console.log(divide(10, 2));
    console.log(divide(10, 0));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
```

Once an error is thrown, the remaining statements in that `try` block are skipped, and control moves to its handler.

---

## 11. Error Handling with Promises

Promises can fail. Use `.catch()` to handle a rejected Promise.

```typescript
function getData(): Promise<string> {
    return Promise.reject(
        new Error("Failed to load data")
    );
}

getData()
    .then((data) => {
        console.log(data);
    })
    .catch((error: unknown) => {
        if (error instanceof Error) {
            console.log(error.message);
        }
    });
```

The `.catch()` handler can handle a rejection from the Promise or an error thrown in an earlier `.then()` callback.

---

## 12. Error Handling with `async` and `await`

When using `async` and `await`, use `try` and `catch` to handle rejected Promises.

```typescript
async function fetchData(): Promise<string> {
    throw new Error("Unable to fetch data");
}

async function main(): Promise<void> {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

main();
```

Remember that an `async` function returns a Promise, even when its result is a simple value.

---

## 13. A Type-Safe Error Message Helper

We can create a reusable function to convert unknown errors into readable messages.

```typescript
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return "An unexpected error occurred";
}
```

Usage:

```typescript
try {
    throw new Error("Something failed");
} catch (error: unknown) {
    console.log(getErrorMessage(error));
}
```

This helper is useful when handling errors across many functions.

---

## 14. Best Practices

- Use `try` and `catch` where you can meaningfully handle an error.
- Prefer `unknown` over `any` for caught errors.
- Validate user input before processing it.
- Use custom error classes when error categories matter.
- Provide useful error messages without exposing secrets.
- Handle rejected Promises.
- Avoid empty `catch` blocks.
- Do not use exceptions as a replacement for ordinary condition checks.
- Do not assume every thrown value is an `Error` object.
- Use `finally` for cleanup when appropriate.

---

## Important Points

- `try` contains code that may throw an error.
- `catch` handles errors.
- `finally` is used for cleanup.
- `throw` raises an exception.
- `Error` represents an error.
- Custom error classes represent specific failures.
- `unknown` requires type checking before use.
- `.catch()` handles Promise rejections.
- `async`/`await` works with `try`/`catch`.
- Error handling makes applications more reliable.


