class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

class InsufficientFundsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InsufficientFundsError";
    }
}

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return "An unexpected error occurred";
}

function validateUsername(username: string): void {
    if (username.trim().length < 3) {
        throw new ValidationError(
            "Username must contain at least 3 characters"
        );
    }
}

class BankAccount {
    constructor(
        public readonly accountHolder: string,
        private balance: number
    ) {}

    deposit(amount: number): void {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new ValidationError(
                "Deposit amount must be a positive number"
            );
        }

        this.balance += amount;
        console.log(`Deposited: ₹${amount}`);
    }

    withdraw(amount: number): void {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new ValidationError(
                "Withdrawal amount must be a positive number"
            );
        }

        if (amount > this.balance) {
            throw new InsufficientFundsError(
                "Insufficient account balance"
            );
        }

        this.balance -= amount;
        console.log(`Withdrawn: ₹${amount}`);
    }

    getBalance(): number {
        return this.balance;
    }
}

async function simulateTransaction(): Promise<string> {
    throw new Error("Transaction service is unavailable");
}

async function main(): Promise<void> {
    const account = new BankAccount("Alex", 5000);

    try {
        validateUsername("Alex");

        account.deposit(1000);
        account.withdraw(15000);

        // Uncomment to test an insufficient-funds error:
        // account.withdraw(10000);

        console.log(
            "Current balance:",
            `₹${account.getBalance()}`
        );
    } catch (error: unknown) {
        console.log("Transaction error:", getErrorMessage(error));
    } finally {
        console.log("Bank account operation finished.");
    }

    try {
        await simulateTransaction();
    } catch (error: unknown) {
        console.log("Async error:", getErrorMessage(error));
    }
}

main();

