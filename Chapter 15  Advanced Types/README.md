# 📖 Chapter 15: Advanced Types

## 🎯 Learning Objectives

In this chapter, you will learn:

* What Advanced Types are.
* The `keyof` operator.
* The `typeof` operator in type contexts.
* Indexed Access Types.
* Conditional Types.
* Mapped Types.
* Template Literal Types.
* The `infer` keyword.
* How to combine Advanced Types.
* How Advanced Types are useful in real projects.

---

# 1️⃣ What Are Advanced Types?

**Advanced Types** are TypeScript features that allow us to create flexible, reusable, and powerful type definitions.

They are useful when working with:

* Large applications
* APIs
* Libraries
* Generic functions
* Reusable components
* Complex data structures

Some important Advanced Type features are:

```text
keyof
typeof
Indexed Access Types
Conditional Types
Mapped Types
Template Literal Types
infer
```

---

# 2️⃣ `keyof` Operator

The `keyof` operator creates a union of all property names of a type.

### Example

```typescript
interface Student {
    id: number;
    name: string;
    course: string;
}
```

We can use:

```typescript
type StudentKeys = keyof Student;
```

`StudentKeys` becomes:

```text
"id" | "name" | "course"
```

Example:

```typescript
let key: StudentKeys;

key = "id";
key = "name";
key = "course";
```

This is valid:

```typescript
key = "name";
```

But this is invalid:

```typescript
// key = "age"; // ❌ Error
```

because `age` is not a property of `Student`.

---

# 3️⃣ Using `keyof` with Functions

`keyof` is very useful with generic functions.

```typescript
interface Student {
    id: number;
    name: string;
    course: string;
}

function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Now:

```typescript
const student: Student = {
    id: 101,
    name: "Aditya",
    course: "BCA"
};

console.log(
    getProperty(student, "name")
);

console.log(
    getProperty(student, "course")
);
```

The function only accepts valid property names.

```typescript
// getProperty(student, "age"); // ❌ Error
```

---

# 4️⃣ `typeof` in Type Context

You already know `typeof` from JavaScript:

```typescript
console.log(typeof "Hello");
```

It returns:

```text
string
```

TypeScript also allows `typeof` to create a type from an existing value.

### Example

```typescript
const student = {
    id: 101,
    name: "Aditya",
    course: "BCA"
};

type Student = typeof student;
```

Now `Student` automatically becomes:

```typescript
{
    id: number;
    name: string;
    course: string;
}
```

We can use it:

```typescript
const student2: Student = {
    id: 102,
    name: "Rahul",
    course: "BCA"
};
```

---

# 5️⃣ `typeof` with Arrays

We can also use `typeof` with arrays.

```typescript
const courses = [
    "Java",
    "Python",
    "TypeScript"
];
```

Create a type:

```typescript
type Courses = typeof courses;
```

The type is approximately:

```typescript
string[]
```

---

# 6️⃣ Indexed Access Types

**Indexed Access Types** allow us to access the type of a specific property.

Example:

```typescript
interface Student {
    id: number;
    name: string;
    course: string;
}
```

We can access the type of `name`:

```typescript
type StudentName = Student["name"];
```

Now:

```text
StudentName = string
```

Similarly:

```typescript
type StudentID = Student["id"];
```

The type becomes:

```text
number
```

---

# 7️⃣ Indexed Access with Multiple Properties

We can access multiple properties.

```typescript
type StudentBasicInfo =
    Student["id" | "name"];
```

This produces:

```typescript
number | string
```

So:

```typescript
let value: StudentBasicInfo;

value = 101;
value = "Aditya";
```

Both are valid.

---

# 8️⃣ Conditional Types

A **Conditional Type** selects one type based on a condition.

The basic syntax is:

```typescript
T extends U ? X : Y
```

It means:

```text
If T extends U
    → use X
Otherwise
    → use Y
```

### Example

```typescript
type IsString<T> =
    T extends string
        ? "Yes"
        : "No";
```

Now:

```typescript
type Result1 = IsString<string>;
```

Result:

```text
"Yes"
```

And:

```typescript
type Result2 = IsString<number>;
```

Result:

```text
"No"
```

---

# 9️⃣ Conditional Type Example

```typescript
type CheckType<T> =
    T extends number
        ? "Number"
        : T extends string
        ? "String"
        : "Other";
```

Now:

```typescript
type A = CheckType<number>;
```

Result:

```text
"Number"
```

```typescript
type B = CheckType<string>;
```

Result:

```text
"String"
```

```typescript
type C = CheckType<boolean>;
```

Result:

```text
"Other"
```

---

# 🔟 Mapped Types

**Mapped Types** allow us to create a new type by transforming the properties of an existing type.

Basic syntax:

```typescript
type NewType<T> = {
    [K in keyof T]: ...
};
```

### Example

```typescript
interface Student {
    id: number;
    name: string;
    course: string;
}
```

Create a readonly version:

```typescript
type ReadonlyStudent = {
    readonly [K in keyof Student]: Student[K];
};
```

Now:

```typescript
const student: ReadonlyStudent = {
    id: 101,
    name: "Aditya",
    course: "BCA"
};
```

This is not allowed:

```typescript
// student.name = "Rahul"; // ❌ Error
```

---

# 1️⃣1️⃣ Mapped Types with Optional Properties

We can make every property optional.

```typescript
type OptionalStudent = {
    [K in keyof Student]?: Student[K];
};
```

Now:

```typescript
const student: OptionalStudent = {
    name: "Aditya"
};
```

We do not need to provide every property.

---

# 1️⃣2️⃣ Mapped Types and Utility Types

Many built-in Utility Types are based on Mapped Types.

For example:

```typescript
Partial<T>
```

makes properties optional.

Conceptually, it works like:

```typescript
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};
```

Similarly, a readonly type can be created with:

```typescript
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};
```

This shows how TypeScript Utility Types work internally at a conceptual level.

---

# 1️⃣3️⃣ Template Literal Types

Template Literal Types allow us to create string types using template syntax.

Example:

```typescript
type Color = "red" | "blue";

type ColorMessage =
    `color-${Color}`;
```

The possible values are:

```text
"color-red"
"color-blue"
```

Example:

```typescript
let message: ColorMessage;

message = "color-red";
message = "color-blue";
```

This is invalid:

```typescript
// message = "color-green"; // ❌ Error
```

---

# 1️⃣4️⃣ Template Literal Types with Unions

We can combine multiple unions.

```typescript
type Size = "small" | "large";

type Color = "red" | "blue";

type ProductCode =
    `${Color}-${Size}`;
```

Possible values:

```text
red-small
red-large
blue-small
blue-large
```

Example:

```typescript
let code: ProductCode;

code = "red-small";
code = "blue-large";
```

---

# 1️⃣5️⃣ `infer` Keyword

The `infer` keyword allows TypeScript to infer a type inside a Conditional Type.

### Example

```typescript
type ReturnTypeOf<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;
```

Consider:

```typescript
function add(
    a: number,
    b: number
): number {
    return a + b;
}
```

Now:

```typescript
type AddResult =
    ReturnTypeOf<typeof add>;
```

The result is:

```text
number
```

`infer R` tells TypeScript:

> Infer the return type and store it in `R`.

---

# 1️⃣6️⃣ Combining `keyof` and Indexed Access Types

These features become very powerful when combined.

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
}
```

Create a generic function:

```typescript
function getProductValue<
    K extends keyof Product
>(
    product: Product,
    key: K
): Product[K] {
    return product[key];
}
```

Example:

```typescript
const product: Product = {
    id: 1,
    name: "Laptop",
    price: 50000
};

const name = getProductValue(
    product,
    "name"
);

const price = getProductValue(
    product,
    "price"
);
```

TypeScript understands:

```text
name  → string
price → number
```

---

# 1️⃣7️⃣ Combining Mapped and Conditional Types

We can create advanced transformations.

Example:

```typescript
interface User {
    id: number;
    name: string;
    active: boolean;
}
```

Suppose we want to make only `string` properties optional.

```typescript
type OptionalStrings<T> = {
    [K in keyof T]:
        T[K] extends string
            ? T[K] | undefined
            : T[K];
};
```

Now:

```typescript
type UserResult =
    OptionalStrings<User>;
```

Conceptually:

```typescript
{
    id: number;
    name: string | undefined;
    active: boolean;
}
```

This demonstrates how Advanced Types can be combined.

---

# 1️⃣8️⃣ Real-World Example: API Response

Advanced Types are useful when working with APIs.

Suppose:

```typescript
interface User {
    id: number;
    name: string;
}
```

Create:

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
```

Now:

```typescript
type UserResponse =
    ApiResponse<User>;
```

We can create:

```typescript
const response: UserResponse = {
    success: true,
    data: {
        id: 1,
        name: "Aditya"
    }
};
```

The same generic structure can be reused:

```typescript
type ProductResponse =
    ApiResponse<Product>;
```

This is common in real applications.

---

# 🆚 Advanced Types Comparison

| Feature               | Purpose                                 |
| --------------------- | --------------------------------------- |
| `keyof`               | Gets property names of a type           |
| `typeof`              | Creates a type from a value             |
| Indexed Access        | Gets the type of a property             |
| Conditional Type      | Selects a type based on a condition     |
| Mapped Type           | Transforms properties of a type         |
| Template Literal Type | Creates advanced string types           |
| `infer`               | Infers a type inside a conditional type |

---

# 💻 Complete Practical Example

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}


// 1. keyof

type ProductKey = keyof Product;

let key: ProductKey;

key = "id";
key = "name";
key = "price";
key = "category";


// 2. typeof

const product = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};

type ProductType = typeof product;


// 3. Indexed Access Type

type ProductName = Product["name"];

let productName: ProductName;

productName = "Laptop";


// 4. Conditional Type

type IsString<T> =
    T extends string
        ? "Yes"
        : "No";

type CheckName =
    IsString<Product["name"]>;

type CheckPrice =
    IsString<Product["price"]>;


// 5. Mapped Type

type ReadonlyProduct = {
    readonly [K in keyof Product]: Product[K];
};

const savedProduct: ReadonlyProduct = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};


// 6. Template Literal Type

type ProductEvent =
    `product-${"created" | "updated" | "deleted"}`;

let eventName: ProductEvent;

eventName = "product-created";
eventName = "product-updated";
eventName = "product-deleted";


// 7. Generic function with keyof

function getProperty<
    T,
    K extends keyof T
>(
    object: T,
    key: K
): T[K] {
    return object[key];
}

console.log(
    getProperty(product, "name")
);

console.log(
    getProperty(product, "price")
);


// 8. Conditional + Mapped Type

type OptionalStrings<T> = {
    [K in keyof T]:
        T[K] extends string
            ? T[K] | undefined
            : T[K];
};

type ProductWithOptionalStrings =
    OptionalStrings<Product>;


// 9. infer

type ReturnTypeOf<T> =
    T extends (...args: any[]) => infer R
        ? R
        : never;

function calculatePrice(
    price: number,
    quantity: number
): number {
    return price * quantity;
}

type PriceResult =
    ReturnTypeOf<typeof calculatePrice>;


// Output

console.log("\nProduct:");
console.log(product);

console.log("\nProduct Name:");
console.log(productName);

console.log("\nProduct Event:");
console.log(eventName);

console.log("\nCalculated Price:");
console.log(
    calculatePrice(50000, 2)
);
```

---

# ▶️ Compile and Run

Inside the chapter folder:

```bash
tsc advanced-types.ts
```

Then:

```bash
node advanced-types.js
```

If you are using your project `tsconfig.json`:

```bash
tsc
```

Then run the generated JavaScript file according to your `outDir` configuration.

---

# 📝 Practice Task

Create an interface:

```typescript
interface Student {
    id: number;
    name: string;
    age: number;
    course: string;
}
```

Complete the following tasks.

### 1. `keyof`

Create:

```typescript
type StudentKey = keyof Student;
```

Use it to store valid property names.

---

### 2. `typeof`

Create a student object:

```typescript
const student = {
    id: 101,
    name: "Aditya",
    age: 19,
    course: "BCA"
};
```

Create a type from it using:

```typescript
typeof
```

---

### 3. Indexed Access Type

Create a type that represents the type of the `name` property.

Expected:

```text
string
```

---

### 4. Conditional Type

Create:

```typescript
type IsNumber<T> = ...
```

It should return:

```text
"Yes"
```

when `T` is a number and:

```text
"No"
```

for other types.

---

### 5. Mapped Type

Create:

```typescript
type ReadonlyStudent = ...
```

All properties should become readonly.

---

### 6. Template Literal Type

Create:

```typescript
type StudentEvent = ...
```

It should allow:

```text
student-created
student-updated
student-deleted
```

---

### 7. Generic Function

Create:

```typescript
getStudentProperty()
```

The function should accept a student and a valid property name.

---

### 8. Bonus Challenge ⭐

Create a generic API response:

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
```

Then create:

```typescript
StudentResponse
```

using:

```typescript
ApiResponse<Student>
```

---

# 📌 Important Points

* `keyof` gets the keys of a type.
* `typeof` can create a type from an existing value.
* Indexed Access Types access property types.
* Conditional Types work like type-level `if/else`.
* Mapped Types transform existing types.
* Template Literal Types create specific string patterns.
* `infer` allows TypeScript to infer types inside conditional types.
* Advanced Types are especially useful with generics.
* Advanced Types are commonly used in libraries, APIs, and large applications.
* These features help create reusable and type-safe code.

---

# 🎯 Real-World Importance

Advanced Types are useful when building:

```text
Frontend Applications
        ↓
React / Angular / Next.js
        ↓
API Integration
        ↓
Backend Services
        ↓
Reusable Libraries
        ↓
Large TypeScript Projects
```

For example, in an e-commerce application, Advanced Types can help create safe types for:

```text
Products
Users
Orders
Payments
API Responses
Events
Database Models
```

