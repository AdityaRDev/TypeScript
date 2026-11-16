import _ from "lodash";

// 1. Application Information
const appName: string = "NPM TypeScript Project";
console.log("Application:", appName);


// 2. Working with Arrays
const numbers: number[] = [
    10, 20, 30, 40, 50, 60
];
console.log("\nOriginal Array:");
console.log(numbers);


// 3. Using Lodash chunk()
const chunkedNumbers = _.chunk(numbers, 2);
console.log("\nChunked Array:");
console.log(chunkedNumbers);


// 4. Using Lodash reverse()

const reversedNumbers = _.reverse([...numbers]);

console.log("\nReversed Array:");
console.log(reversedNumbers);


// 5. Using Lodash sum()

const total = _.sum(numbers);
console.log("\nTotal:");
console.log(total);


// 6. Using Lodash max()
const maximum = _.max(numbers);
console.log("\nMaximum Number:");
console.log(maximum);

// 7. Using Lodash min()
const minimum = _.min(numbers);
console.log("\nMinimum Number:");
console.log(minimum);

// 8. Custom TypeScript Function
function calculateAverage(values: number[]): number {
    if (values.length === 0) {
        return 0;
    }
    return _.sum(values) / values.length;
}
console.log("\nAverage:");
console.log(calculateAverage(numbers));

// 9. Working with Objects
interface Product {
    id: number;
    name: string;
    price: number;
}
const products: Product[] = [
    { id: 1, name: "Laptop", price: 45000 },
    { id: 2, name: "Mouse", price: 500 },
    { id: 3, name: "Keyboard", price: 1200 }
];
console.log("\nProduct Names and Prices:");
const productNames = _.map(products,(product)=>{
    console.log("Name: ",product.name," ,Price",product.price);
});

// 10. Filtering Products
const expensiveProducts = _.filter(
    products,
    (product) => product.price > 1000
);
console.log("\nProducts Above 1000:");
console.log(expensiveProducts);


// output
// Application: NPM TypeScript Project

// Original Array:
// [ 10, 20, 30, 40, 50, 60 ]

// Chunked Array:
// [ [ 10, 20 ], [ 30, 40 ], [ 50, 60 ] ]

// Reversed Array:
// [ 60, 50, 40, 30, 20, 10 ]

// Total:
// 210

// Maximum Number:
// 60

// Minimum Number:
// 10

// Average:
// 35

// Product Names and Prices:
// Name:  Laptop  ,Price 45000
// Name:  Mouse  ,Price 500
// Name:  Keyboard  ,Price 1200

// Products Above 1000:
// [
//   { id: 1, name: 'Laptop', price: 45000 },
//   { id: 3, name: 'Keyboard', price: 1200 }
// ]