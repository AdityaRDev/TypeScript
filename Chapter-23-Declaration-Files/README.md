# Chapter 23: Declaration Files and @types

## 1. Introduction

TypeScript provides static type checking, but JavaScript libraries do not always contain TypeScript type information.

Declaration files help TypeScript understand the types of JavaScript code.

A declaration file uses the `.d.ts` extension.

For example:

```text
library.js
library.d.ts
```

The JavaScript file contains the actual implementation, while the declaration file describes its types.

## 2. What is a Declaration File?

A declaration file is a file that describes the types of variables, functions, classes, objects, and modules.

It tells TypeScript what types are available without providing the actual implementation.

**Example:**

```typescript
// math-utils.d.ts

export declare function add(
    a: number,
    b: number
): number;
```

This declaration tells TypeScript that the `add` function:
- Accepts two numbers.
- Returns a number.
- Is exported from the module.

The declaration itself does not implement the function.

## 3. What is the .d.ts Extension?

The `.d.ts` extension represents a TypeScript declaration file.

Common examples:

```text
index.d.ts
global.d.ts
math-utils.d.ts
custom-types.d.ts
```

Declaration files help TypeScript understand code written in JavaScript.

## 4. declare Keyword

The `declare` keyword tells TypeScript that a variable, function, or other declaration already exists.

It describes something that is implemented elsewhere.

**Example:**

```typescript
declare const appName: string;

declare function greet(name: string): void;
```

These declarations do not create JavaScript variables or functions.

They only provide type information to TypeScript.

## 5. Creating a Custom Declaration File

Suppose we have a JavaScript function:

```javascript
// math-utils.js

export function add(a, b) {
    return a + b;
}
```

We can describe it using a declaration file:

```typescript
// math-utils.d.ts

export declare function add(
    a: number,
    b: number
): number;
```

Now TypeScript can understand the function's argument and return types.

The declaration file must correctly describe the actual JavaScript implementation.

## 6. Using Declaration Files

A declaration file can describe the types of a JavaScript module.

For example:

```typescript
// math-utils.d.ts

export declare function add(
    a: number,
    b: number
): number;

export declare function multiply(
    a: number,
    b: number
): number;
```

A TypeScript file can import these functions:

```typescript
import { add, multiply } from "./math-utils";

console.log(add(10, 20));
console.log(multiply(5, 4));
```

The corresponding JavaScript implementation must exist at runtime.

A declaration file alone does not create the functions.

## 7. What is @types?

The `@types` packages provide TypeScript declaration files for JavaScript libraries.

They are commonly installed using npm.

For example:

```bash
npm install --save-dev @types/node
```

This installs TypeScript type definitions for Node.js.

Another example:

```bash
npm install --save-dev @types/lodash
```

This provides type definitions for Lodash.

Some JavaScript libraries include their own TypeScript declarations, so a separate `@types` package may not be required.

## 8. Installing Type Definitions

Follow these steps to install type definitions.

**Step 1: Initialize npm**

```bash
npm init -y
```

**Step 2: Install the required library**

```bash
npm install lodash
```

**Step 3: Install its type definitions**

```bash
npm install --save-dev @types/lodash
```

**Step 4: Import the library in TypeScript**

```typescript
import _ from "lodash";

const numbers = [10, 20, 30, 40];

const reversed = _.reverse(numbers);

console.log(reversed);
```

TypeScript can now understand the types provided by the installed declaration package.

Note: This example uses Lodash's default import. Its import configuration can depend on the TypeScript module settings and package setup.

## 9. Global Declaration Files

Global declaration files describe variables or functions that are available globally.

**Example:**

```typescript
// global.d.ts

declare const appVersion: string;

declare function showMessage(
    message: string
): void;
```

You can use these declarations in TypeScript files included in the same project.

For example:

```typescript
console.log(appVersion);

showMessage("Welcome");
```

The actual JavaScript application must provide `appVersion` and `showMessage` at runtime.

## 10. Module Declaration

Module declarations describe the types of modules that do not provide their own TypeScript definitions.

**Example:**

```typescript
declare module "my-library" {
    export function greet(name: string): string;
}
```

This tells TypeScript that the module named `my-library` exports a function called `greet`.

The actual module must still be installed or otherwise available when the application runs.

## 11. Declaration Files vs TypeScript Files

| TypeScript File (.ts) | Declaration File (.d.ts) |
|---|---|
| Contains implementation and types | Contains type declarations |
| Can generate JavaScript | Does not generate implementation JavaScript |
| Can contain executable code | Describes existing code |
| Used to build application logic | Used to provide type information |

## 12. What is DefinitelyTyped?

DefinitelyTyped is a community-maintained repository of TypeScript declaration files for many JavaScript libraries.

Many of its packages are published under the `@types` namespace on npm.

Examples:

```bash
npm install --save-dev @types/node
npm install --save-dev @types/express
npm install --save-dev @types/lodash
```

Always check whether a library already includes its own type definitions before installing a separate package.

## 13. Practical Example

Suppose we create a JavaScript math utility library and want to use it from TypeScript.

JavaScript implementation:

```javascript
// math-utils.js

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

Declaration file:

```typescript
// math-utils.d.ts

export declare function add(
    a: number,
    b: number
): number;

export declare function subtract(
    a: number,
    b: number
): number;
```

TypeScript usage:

```typescript
import { add, subtract } from "./math-utils.js";

console.log(add(20, 10));
console.log(subtract(20, 10));
```

**Output:**

```text
30
10
```

The declaration file provides type checking, while the JavaScript file provides the actual functions.

## 14. Important Points

- Declaration files use the `.d.ts` extension.
- Declaration files describe existing JavaScript code.
- The `declare` keyword provides type information without implementing the value.
- `@types` packages provide definitions for many JavaScript libraries.
- DefinitelyTyped is a community-maintained source of many type definitions.
- Some libraries already include their own declarations.
- A declaration file does not provide runtime implementation.
- Incorrect declarations can cause TypeScript to trust types that do not match the actual code.

## 15. Practice Tasks

1. Create a declaration file for a function that calculates the square of a number.
2. Create a declaration file for a function that accepts two strings and returns a string.
3. Create a global declaration for an application name.
4. Install `@types/node` and explore its purpose.
5. Install a JavaScript library and check whether it includes its own type definitions.
6. Create a module declaration for a fictional library.
7. Create a JavaScript utility file and a matching `.d.ts` file.
8. Import the JavaScript utility into TypeScript and test its type checking.
