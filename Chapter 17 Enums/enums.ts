// ========================================
// CHAPTER 17: ENUMS
// ========================================

// 1. Numeric Enum

enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log("===== NUMERIC ENUM =====");
console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);


// 2. Custom Numeric Enum

enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log("\n===== CUSTOM NUMERIC ENUM =====");
console.log(StatusCode.Success);
console.log(StatusCode.NotFound);
console.log(StatusCode.ServerError);


// 3. String Enum

enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

console.log("\n===== STRING ENUM =====");
console.log(UserRole.Admin);
console.log(UserRole.User);
console.log(UserRole.Guest);


// 4. Automatic Enum Values

enum Weekday {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

console.log("\n===== WEEKDAY ENUM =====");
console.log(Weekday.Monday);
console.log(Weekday.Tuesday);
console.log(Weekday.Friday);


// 5. Reverse Mapping

enum Color {
    Red,
    Green,
    Blue
}

console.log("\n===== REVERSE MAPPING =====");
console.log(Color.Red);
console.log(Color[0]);
console.log(Color[1]);
console.log(Color[2]);


// 6. Const Enum

const enum Size {
    Small,
    Medium,
    Large
}

const selectedSize: Size = Size.Medium;

console.log("\n===== CONST ENUM =====");
console.log(selectedSize);


// 7. Heterogeneous Enum

enum Data {
    Id = 101,
    Name = "Aditya",
    Active = 1
}

console.log("\n===== HETEROGENEOUS ENUM =====");
console.log(Data.Id);
console.log(Data.Name);
console.log(Data.Active);


// 8. Enum with Function

enum PaymentStatus {
    Pending = "PENDING",
    Completed = "COMPLETED",
    Failed = "FAILED"
}

function processPayment(status: PaymentStatus): void {
    switch (status) {
        case PaymentStatus.Pending:
            console.log("Payment is processing");
            break;

        case PaymentStatus.Completed:
            console.log("Payment successful");
            break;

        case PaymentStatus.Failed:
            console.log("Payment failed");
            break;
    }
}

console.log("\n===== PAYMENT FUNCTION =====");

processPayment(PaymentStatus.Completed);
processPayment(PaymentStatus.Pending);
processPayment(PaymentStatus.Failed);


// 9. Enum with Interface

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

console.log("\n===== USER DETAILS =====");
console.log(user);


// 10. Enum with Switch

enum TrafficLight {
    Red = "RED",
    Yellow = "YELLOW",
    Green = "GREEN"
}

function trafficSignal(light: TrafficLight): void {
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

console.log("\n===== TRAFFIC SIGNAL =====");

trafficSignal(TrafficLight.Red);
trafficSignal(TrafficLight.Green);
 3

// 11. Union Type Alternative

type AccountRole = "ADMIN" | "USER" | "GUEST";

let accountRole: AccountRole = "ADMIN";

console.log("\n===== UNION TYPE =====");
console.log(accountRole);


// 12. as const Alternative

const UserRoles = {
    Admin: "ADMIN",
    User: "USER",
    Guest: "GUEST"
} as const;

type UserRoleType =
    typeof UserRoles[keyof typeof UserRoles];

function displayRole(role: UserRoleType): void {
    console.log("Selected Role:", role);
}

console.log("\n===== AS CONST =====");

displayRole(UserRoles.Admin);
displayRole(UserRoles.User);
displayRole(UserRoles.Guest);


// 13. Complete E-Commerce Example

enum OrderStatus {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED"
}

enum OrderPayment {
    UPI = "UPI",
    Card = "CARD",
    Cash = "CASH"
}

interface Order {
    id: number;
    customerName: string;
    amount: number;
    status: OrderStatus;
    payment: OrderPayment;
}

const order: Order = {
    id: 101,
    customerName: "Aditya",
    amount: 2500,
    status: OrderStatus.Processing,
    payment: OrderPayment.UPI
};

function displayOrder(order: Order): void {
    console.log("Order ID:", order.id);
    console.log("Customer:", order.customerName);
    console.log("Amount:", order.amount);
    console.log("Status:", order.status);
    console.log("Payment:", order.payment);
}

function updateOrderStatus(status: OrderStatus): void {
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

console.log("\n===== COMPLETE E-COMMERCE EXAMPLE =====");

displayOrder(order);

console.log("\n===== ORDER STATUS =====");

updateOrderStatus(order.status);
