"use strict";
// ========================================
// CHAPTER 17: ENUMS
// ========================================
// 1. Numeric Enum
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
console.log("===== NUMERIC ENUM =====");
console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);
// 2. Custom Numeric Enum
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (StatusCode = {}));
console.log("\n===== CUSTOM NUMERIC ENUM =====");
console.log(StatusCode.Success);
console.log(StatusCode.NotFound);
console.log(StatusCode.ServerError);
// 3. String Enum
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["User"] = "USER";
    UserRole["Guest"] = "GUEST";
})(UserRole || (UserRole = {}));
console.log("\n===== STRING ENUM =====");
console.log(UserRole.Admin);
console.log(UserRole.User);
console.log(UserRole.Guest);
// 4. Automatic Enum Values
var Weekday;
(function (Weekday) {
    Weekday[Weekday["Monday"] = 1] = "Monday";
    Weekday[Weekday["Tuesday"] = 2] = "Tuesday";
    Weekday[Weekday["Wednesday"] = 3] = "Wednesday";
    Weekday[Weekday["Thursday"] = 4] = "Thursday";
    Weekday[Weekday["Friday"] = 5] = "Friday";
})(Weekday || (Weekday = {}));
console.log("\n===== WEEKDAY ENUM =====");
console.log(Weekday.Monday);
console.log(Weekday.Tuesday);
console.log(Weekday.Friday);
// 5. Reverse Mapping
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
console.log("\n===== REVERSE MAPPING =====");
console.log(Color.Red);
console.log(Color[0]);
console.log(Color[1]);
console.log(Color[2]);
const selectedSize = 1 /* Size.Medium */;
console.log("\n===== CONST ENUM =====");
console.log(selectedSize);
// 7. Heterogeneous Enum
var Data;
(function (Data) {
    Data[Data["Id"] = 101] = "Id";
    Data["Name"] = "Aditya";
    Data[Data["Active"] = 1] = "Active";
})(Data || (Data = {}));
console.log("\n===== HETEROGENEOUS ENUM =====");
console.log(Data.Id);
console.log(Data.Name);
console.log(Data.Active);
// 8. Enum with Function
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "PENDING";
    PaymentStatus["Completed"] = "COMPLETED";
    PaymentStatus["Failed"] = "FAILED";
})(PaymentStatus || (PaymentStatus = {}));
function processPayment(status) {
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
const user = {
    id: 101,
    name: "Aditya",
    role: UserRole.Admin
};
console.log("\n===== USER DETAILS =====");
console.log(user);
// 10. Enum with Switch
var TrafficLight;
(function (TrafficLight) {
    TrafficLight["Red"] = "RED";
    TrafficLight["Yellow"] = "YELLOW";
    TrafficLight["Green"] = "GREEN";
})(TrafficLight || (TrafficLight = {}));
function trafficSignal(light) {
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
3;
let accountRole = "ADMIN";
console.log("\n===== UNION TYPE =====");
console.log(accountRole);
// 12. as const Alternative
const UserRoles = {
    Admin: "ADMIN",
    User: "USER",
    Guest: "GUEST"
};
function displayRole(role) {
    console.log("Selected Role:", role);
}
console.log("\n===== AS CONST =====");
displayRole(UserRoles.Admin);
displayRole(UserRoles.User);
displayRole(UserRoles.Guest);
// 13. Complete E-Commerce Example
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "PENDING";
    OrderStatus["Processing"] = "PROCESSING";
    OrderStatus["Shipped"] = "SHIPPED";
    OrderStatus["Delivered"] = "DELIVERED";
    OrderStatus["Cancelled"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
var OrderPayment;
(function (OrderPayment) {
    OrderPayment["UPI"] = "UPI";
    OrderPayment["Card"] = "CARD";
    OrderPayment["Cash"] = "CASH";
})(OrderPayment || (OrderPayment = {}));
const order = {
    id: 101,
    customerName: "Aditya",
    amount: 2500,
    status: OrderStatus.Processing,
    payment: OrderPayment.UPI
};
function displayOrder(order) {
    console.log("Order ID:", order.id);
    console.log("Customer:", order.customerName);
    console.log("Amount:", order.amount);
    console.log("Status:", order.status);
    console.log("Payment:", order.payment);
}
function updateOrderStatus(status) {
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
