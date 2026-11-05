# Chapter 17: Enums

## Learning Objectives

In this chapter, you will learn:

- What enums are in TypeScript.
- Why enums are useful.
- Numeric enums.
- String enums.
- Automatic enum values.
- Custom enum values.
- Reverse mapping in numeric enums.
- `const enum`.
- Heterogeneous enums.
- Using enums with functions.
- Using enums with interfaces and objects.
- Alternatives to enums using `as const`.

---

## 1. What Is an Enum?

An **enum (enumeration)** is a TypeScript feature that allows us to define a collection of named constants.

Enums make code easier to read and maintain because we can use meaningful names instead of unexplained numbers or strings.

### Without Enum

```typescript
let status = 1;

if (status === 1) {
    console.log("Order Pending");
}
```

Here, it is not immediately clear what `1` represents.

### With Enum

```typescript
enum OrderStatus {
    Pending,
    Shipped,
    Delivered
}

let status = OrderStatus.Pending;

if (status === OrderStatus.Pending) {
    console.log("Order Pending");
}
```

Now the code is easier to understand.

---

## 2. Numeric Enums

A numeric enum assigns numbers to its members.

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);
```

### Output

```text
0
1
2
3
```

By default, numeric enum values start at `0` and increase by `1`.

---

## 3. Custom Numeric Enum Values

We can manually assign numbers to enum members.

```typescript
enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log(StatusCode.Success);
console.log(StatusCode.NotFound);
console.log(StatusCode.ServerError);
```

### Output

```text
200
404
500
```

We can also mix manually assigned values with automatic values.

```typescript
enum Priority {
    Low = 1,
    Medium,
    High,
    Critical
}

console.log(Priority.Low);      // 1
console.log(Priority.Medium);   // 2
console.log(Priority.High);     // 3
console.log(Priority.Critical); // 4
```

Each automatically assigned value is one greater than the previous numeric value.

---

## 4. String Enums

A string enum assigns string values to its members.

```typescript
enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

console.log(UserRole.Admin);
console.log(UserRole.User);
console.log(UserRole.Guest);
```

### Output

```text
ADMIN
USER
GUEST
```

Unlike numeric enums, string enum members must be assigned string values.

### When to Use String Enums?

String enums are useful for:

- User roles.
- Order statuses.
- Payment methods.
- Application settings.
- API status values.

---

## 5. Automatic and Custom Values

### Automatic Numeric Values

```typescript
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}
```

Values:

```text
Monday    = 0
Tuesday   = 1
Wednesday = 2
Thursday  = 3
Friday    = 4
```

### Custom Values

```typescript
enum Weekday {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5
}
```

Now Monday starts at `1` instead of `0`.

---

## 6. Reverse Mapping in Numeric Enums

Numeric enums support reverse mapping.

This means we can get the member name using its numeric value.

```typescript
enum Color {
    Red,
    Green,
    Blue
}

console.log(Color.Red);
console.log(Color[0]);
console.log(Color[1]);
console.log(Color[2]);
```

### Output

```text
0
Red
Green
Blue
```

### Important

Numeric enums support reverse mapping, but string enums do not.

Example:

```typescript
enum Role {
    Admin = "ADMIN",
    User = "USER"
}

console.log(Role.Admin); 
// ADMIN

// Role["ADMIN"] is not a valid reverse lookup.
```

---

## 7. Const Enums

A `const enum` is a special enum that is generally inlined by the TypeScript compiler instead of being emitted as a normal runtime enum object.

```typescript
const enum Size {
    Small,
    Medium,
    Large
}

let selectedSize: Size = Size.Medium;

console.log(selectedSize);
```

### Output

```text
1
```

### Important Points

- Use `const enum` when you want compile-time enum values.
- Values are generally substituted directly during compilation.
- A normal runtime enum object is not generated.
- Some build tools and compiler settings have restrictions on `const enum`.

For example, `const enum` cannot be used like a normal runtime object for reverse mapping.

---

## 8. Heterogeneous Enums

A heterogeneous enum contains both numeric and string members.

```typescript
enum Data {
    Id = 101,
    Name = "Aditya",
    Active = 1
}

console.log(Data.Id);
console.log(Data.Name);
console.log(Data.Active);
```

### Output

```text
101
Aditya
1
```

### Important

Heterogeneous enums are supported, but they are generally discouraged because mixing different value types can make code harder to understand.

Prefer numeric or string enums for a consistent design.

---

## 9. Using Enums with Functions

We can use an enum as a function parameter type.

```typescript
enum PaymentStatus {
    Pending = "PENDING",
    Completed = "COMPLETED",
    Failed = "FAILED"
}

function processPayment(
    status: PaymentStatus
): void {
    if (status === PaymentStatus.Completed) {
        console.log("Payment successful");
    } else if (status === PaymentStatus.Pending) {
        console.log("Payment is processing");
    } else {
        console.log("Payment failed");
    }
}

processPayment(PaymentStatus.Completed);
processPayment(PaymentStatus.Pending);
processPayment(PaymentStatus.Failed);
```

This ensures that the function receives a valid enum member.

---

## 10. Using Enums with Interfaces

Enums can be used as property types inside interfaces.

```typescript
enum UserRole {
    Admin = "ADMIN",
    Customer = "CUSTOMER",
    Seller = "SELLER"
}

interface User {
    id: number;
    name: string;
    role: UserRole;
}

const user: User = {
    id: 101,
    name: "Aditya",
    role: UserRole.Admin
};

console.log(user);
```

Here, the `role` property must use a valid `UserRole` enum member.

---

## 11. Using Enums with Switch Statements

Enums work well with `switch` statements.

```typescript
enum TrafficLight {
    Red = "RED",
    Yellow = "YELLOW",
    Green = "GREEN"
}

function trafficSignal(
    light: TrafficLight
): void {
    switch (light) {
        case TrafficLight.Red:
            console.log("Stop");
            break;

        case TrafficLight.Yellow:
            console.log("Get Ready");
            break;

        case TrafficLight.Green:
            console.log("Go");
            break;
    }
}

trafficSignal(TrafficLight.Red);
trafficSignal(TrafficLight.Green);
```

---

## 12. Enum vs Union Types

Sometimes we can use a union of string literal types instead of an enum.

### Using Enum

```typescript
enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

let userRole: Role = Role.Admin;
```

### Using Union Type

```typescript
type Role = "ADMIN" | "USER" | "GUEST";

let userRole: Role = "ADMIN";
```

Both approaches can represent a limited set of allowed values.

### Comparison

| Feature | Enum | Union Type |
|---|---|---|
| Defines named values | Yes | Uses literal values |
| Runtime object | Normal enums have one | No |
| Numeric values | Supported | Numeric literals are possible |
| String values | Supported | Supported |
| Reverse mapping | Numeric enums only | No |
| Runtime iteration | Possible with normal enums | Not directly |

---

## 13. Alternatives to Enums Using `as const`

We can use an object with `as const` to create a set of constant values.

```typescript
const UserRoles = {
    Admin: "ADMIN",
    User: "USER",
    Guest: "GUEST"
} as const;

type UserRole =
    typeof UserRoles[keyof typeof UserRoles];

let role: UserRole = UserRoles.Admin;

console.log(role);
```

### Output

```text
ADMIN
```

### Understanding the Code

- `as const` preserves literal values and makes object properties readonly.
- `typeof UserRoles` gets the object's type.
- `keyof typeof UserRoles` gets its property names.
- `typeof UserRoles[keyof typeof UserRoles]` extracts the union of its values.

The resulting type is:

```typescript
type UserRole = "ADMIN" | "USER" | "GUEST";
```

This approach is useful when you want both a runtime object and a union type.

---

## 14. When Should You Use Enums?

| Situation | Recommended Approach |
|---|---|
| Numeric application constants | Numeric enum |
| Named string constants | String enum |
| Runtime enum object required | Normal enum |
| Simple allowed string values | Union type |
| Runtime object and literal union | `as const` object |
| Compile-time enum values | `const enum`, when supported by your toolchain |

Choose the approach that makes your code easiest to understand and maintain.

---

# Complete Practical Example

Create a simple e-commerce order management program using enums.

```typescript
enum OrderStatus {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED"
}

enum PaymentMethod {
    UPI = "UPI",
    Card = "CARD",
    Cash = "CASH"
}

interface Order {
    id: number;
    customerName: string;
    amount: number;
    status: OrderStatus;
    payment: PaymentMethod;
}

const order: Order = {
    id: 101,
    customerName: "Aditya",
    amount: 2500,
    status: OrderStatus.Processing,
    payment: PaymentMethod.UPI
};

function displayOrder(order: Order): void {
    console.log("Order ID:", order.id);
    console.log("Customer:", order.customerName);
    console.log("Amount:", order.amount);
    console.log("Status:", order.status);
    console.log("Payment:", order.payment);
}

function updateOrderStatus(
    status: OrderStatus
): void {
    switch (status) {
        case OrderStatus.Pending:
            console.log("Waiting for confirmation");
            break;

        case OrderStatus.Processing:
            console.log("Order is being processed");
            break;

        case OrderStatus.Shipped:
            console.log("Order has been shipped");
            break;

        case OrderStatus.Delivered:
            console.log("Order delivered successfully");
            break;

        case OrderStatus.Cancelled:
            console.log("Order was cancelled");
            break;
    }
}

console.log("===== ORDER DETAILS =====");

displayOrder(order);

console.log("\n===== ORDER UPDATE =====");

updateOrderStatus(order.status);
```

---

## Expected Output

```text
===== ORDER DETAILS =====
Order ID: 101
Customer: Aditya
Amount: 2500
Status: PROCESSING
Payment: UPI

===== ORDER UPDATE =====
Order is being processed
```

---

## Practice Tasks

### Task 1: Student Grade System

Create an enum named `Grade`.

Values:

- A
- B
- C
- D
- F

Create a function that accepts a grade and displays the corresponding result.

### Task 2: User Role Management

Create a string enum named `UserRole`.

Values:

- Admin
- Manager
- Employee
- Customer

Create a function that accepts a role and displays the user's permissions.

### Task 3: Payment System

Create an enum named `PaymentStatus`.

Values:

- Pending
- Successful
- Failed
- Refunded

Create a payment interface and a function to display payment details.

### Task 4: Advanced Challenge

Create an object using `as const` containing:

- Small
- Medium
- Large
- ExtraLarge

Extract a union type from the object values.

Create a function that accepts only those values.

---

## Important Points

- An enum is a collection of named constants.
- Numeric enums start from `0` by default.
- Numeric enum values can be assigned manually.
- String enums require explicit string values.
- Numeric enums support reverse mapping.
- String enums do not support reverse mapping.
- `const enum` values are generally inlined during compilation.
- Heterogeneous enums mix strings and numbers.
- Enums can be used with functions, interfaces, and switch statements.
- Union types can be alternatives to enums.
- `as const` preserves literal values and makes properties readonly.


