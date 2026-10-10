// ========================================
// Chapter 15: Advanced Types
// ========================================


// ========================================
// 1. keyof
// ========================================

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

type ProductKey = keyof Product;

let key: ProductKey;

key = "id";
key = "name";
key = "price";
key = "category";


// ========================================
// 2. typeof
// ========================================

const product = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};

type ProductType = typeof product;


// ========================================
// 3. Indexed Access Type
// ========================================

type ProductName = Product["name"];

let productName: ProductName;

productName = "Laptop";


// ========================================
// 4. Conditional Type
// ========================================

type IsString<T> =
    T extends string
        ? "Yes"
        : "No";

type CheckName =
    IsString<Product["name"]>;

type CheckPrice =
    IsString<Product["price"]>;


// ========================================
// 5. Mapped Type
// ========================================

type ReadonlyProduct = {
    readonly [K in keyof Product]: Product[K];
};

const savedProduct: ReadonlyProduct = {
    id: 1,
    name: "Laptop",
    price: 50000,
    category: "Electronics"
};


// This would cause an error:
// savedProduct.name = "Mobile";


// ========================================
// 6. Template Literal Type
// ========================================

type ProductEvent =
    `product-${"created" | "updated" | "deleted"}`;

let eventName: ProductEvent;

eventName = "product-created";
eventName = "product-updated";
eventName = "product-deleted";


// ========================================
// 7. Generic Function with keyof
// ========================================

function getProperty<
    T,
    K extends keyof T
>(
    object: T,
    key: K
): T[K] {
    return object[key];
}


// ========================================
// 8. Conditional + Mapped Type
// ========================================

type OptionalStrings<T> = {
    [K in keyof T]:
        T[K] extends string
            ? T[K] | undefined
            : T[K];
};

type ProductWithOptionalStrings =
    OptionalStrings<Product>;


// ========================================
// 9. infer
// ========================================

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


// ========================================
// Output
// ========================================

console.log("=== Advanced Types ===");

console.log("\nProduct:");
console.log(product);

console.log("\nProduct Key:");
console.log(key);

console.log("\nProduct Name:");
console.log(productName);

console.log("\nProduct Event:");
console.log(eventName);

console.log("\nSaved Product:");
console.log(savedProduct);

console.log("\nGet Product Name:");
console.log(
    getProperty(product, "name")
);

console.log("\nGet Product Price:");
console.log(
    getProperty(product, "price")
);

console.log("\nCalculated Price:");
console.log(
    calculatePrice(50000, 2)
);


// === Advanced Types ===                                                                                         
                                                                                  
// Product:                                                                                       
// { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' }
                               
// Product Key:                   
// category

// Product Name:
// Laptop

// Product Event:
// product-deleted

// Saved Product:
// { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' }

// Get Product Name:
// Laptop

// Get Product Price:
// 50000

// Calculated Price:
// 100000