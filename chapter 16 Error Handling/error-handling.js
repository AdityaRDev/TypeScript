"use strict";
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
class InsufficientFundsError extends Error {
    constructor(message) {
        super(message);
        this.name = "InsufficientFundsError";
    }
}
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "An unexpected error occurred";
}
function validateUsername(username) {
    if (username.trim().length < 3) {
        throw new ValidationError("Username must contain at least 3 characters");
    }
}
class BankAccount {
    accountHolder;
    balance;
    constructor(accountHolder, balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    deposit(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new ValidationError("Deposit amount must be a positive number");
        }
        this.balance += amount;
        console.log(`Deposited: ₹${amount}`);
    }
    withdraw(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new ValidationError("Withdrawal amount must be a positive number");
        }
        if (amount > this.balance) {
            throw new InsufficientFundsError("Insufficient account balance");
        }
        this.balance -= amount;
        console.log(`Withdrawn: ₹${amount}`);
    }
    getBalance() {
        return this.balance;
    }
}
async function simulateTransaction() {
    throw new Error("Transaction service is unavailable");
}
async function main() {
    const account = new BankAccount("Alex", 5000);
    try {
        validateUsername("Alex");
        account.deposit(1000);
        account.withdraw(15000);
        // Uncomment to test an insufficient-funds error:
        // account.withdraw(10000);
        console.log("Current balance:", `₹${account.getBalance()}`);
    }
    catch (error) {
        console.log("Transaction error:", getErrorMessage(error));
    }
    finally {
        console.log("Bank account operation finished.");
    }
    try {
        await simulateTransaction();
    }
    catch (error) {
        console.log("Async error:", getErrorMessage(error));
    }
}
main();
