// Function Type
type Calculator = (a:number,b:number)=>number
const addition:Calculator=(a,b)=>a+b
const subtraction:Calculator=(a,b)=>a-b
const multiplication:Calculator=(a,b)=>a*b
const division:Calculator=(a,b)=>{
    if(b==0){
        throw new Error("Cannot divide by zero");
    }
    return a/b;
}
console.log(addition(10,20));
console.log(subtraction(10,20));
console.log(multiplication(10,20));
console.log(division(10,20));


// Optional and Default Parameters
function acceptDetails(name:string,age?:number,city:string="pune"){
    console.log("Name: ",name);
    if (age!==undefined) {
        console.log("Age: ",age);
    }
    console.log("City: ",city);
}
console.log(acceptDetails("Aditya",19,"mumbai"));
console.log(acceptDetails("Rahul"));

// Rest Parameters
function acceptNumber(...numbers:number[]):void{
    let total=0;
    let numberCount=numbers.length;
    for(const number of numbers){
        total+=number;
    }
    console.log("Total: ",total);
    console.log("Average: ",total/numberCount);
    
}
acceptNumber(10,20,30,40)

// Function Overloading
function convertValue(value:string):number;
function convertValue(value:number):string;
function convertValue(value:string|number):number|string{
    if (typeof value==="number") {
        return value.toString();
    }else{
        return value.length;
    }
}
console.log("Aditya",convertValue("Aditya"),"Type: ", typeof convertValue("Aditya"));
console.log(19,convertValue(19),"Type: ", typeof convertValue(19));

// Callback Function
function CalculatorMultplication(a:number,b:number,callback:(result:number)=>void):void{
    const result=a*b;
    callback(result);
}   
CalculatorMultplication(10,20,(result)=>{
    console.log("Result: ",result);
})

// Higher-Order Function
function arryCallback(nums:number[],callback:(result:number)=>number):number[]{
    return nums.map((num)=>callback(num))
}
const arr:number[]=[10,20,30,40];
console.log(arryCallback(arr,(arr)=>arr+2));
console.log(arryCallback(arr,(arr)=>arr+arr));
console.log(arryCallback(arr,(arr)=>arr*2));
console.log(arryCallback(arr,(arr)=>arr**6));

// Function Returning Function
function squalNumber():(num:number)=>number{
    return function(num:number):number{
        return num*num;
    }
}
// const sq=squalNumber()
// console.log(sq(5));
console.log(squalNumber()(5));


// Never Return Type
function throwErrorMessage(message: string): never {
  throw new Error(message);
}
// console.log(throwErrorMessagw("somthing wrong"));

// output
// 30
// -10
// 200
// 0.5
// Name:  Aditya
// Age:  19
// City:  mumbai
// undefined
// Name:  Rahul
// City:  pune
// undefined
// Total:  100
// Average:  25
// Aditya 6 Type:  number
// 19 19 Type:  string
// Result:  200
// [ 12, 22, 32, 42 ]
// [ 20, 40, 60, 80 ]
// [ 20, 40, 60, 80 ]
// [ 1000000, 64000000, 729000000, 4096000000 ]
// 25