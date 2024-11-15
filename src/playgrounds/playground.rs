// this is a comment
///doc comment
//! comment for module
/* 
block comment
*/

fn ass3(x: i32) -> i32 {
    x
}

let add = | x:i32, y: i32 | -> i32 {
    x + y
}

let add = |x,y| x + y;

struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn generic_function<T>(x: T) -> T {
    x
}

async fn get_data() -> String{
    "data".to_string()
}

extern "C" {
    fn some_c_function(x:i32) -> i32;

}

// Immutable variable
let x = 5;

// Mutable variable
let mut y = 10;

// Constant
const PI: f64 = 3.14159;

// Static variable
static GLOBAL_VAR: int = 100;

// Shadowing a variable
let z = 1;
let z = z + 1;

// Type annotation
let a: i32 = 42;

// Tuple destructuring
let (b, c) = (1, 2);

// Array
let arr = [1, 2, 3, 4, 5];

// Vector
let vec = vec![1, 2, 3, 4, 5];


// Direct assignment
let x = 5;

// Mutable variable assignment
let mut y = 10;
y = 20;

// Shadowing
let z = 1;
let z = z + 1;

// Using a function return value
let a = some_function();

// Using a block expression
let b = {
    let temp = 2;
    temp + 3
};

// Destructuring assignment
let (c, d) = (4, 5);

// Assigning from an array
let arr = [1, 2, 3];
let first_element = arr[0];

// Assigning from a tuple
let tuple = (6, 7);
let (e, f) = tuple;

// Using a match expression
let g = match some_value {
    1 => "one",
    2 => "two",
    _ => "other",
};


// Struct declaration
struct MyStruct {
    field1: i32,
    field2: String,
}

// Instantiating a struct
let instance = MyStruct {
    field1: 10,
    field2: String::from("Hello"),
};


// Mutable struct
let mut mutable_instance = MyStruct {
    field1: 20,
    field2: String::from("World"),
};

// Tuple struct
struct MyTupleStruct(i32, String);



// Unit-like struct
struct MyUnitStruct;

// Instantiating a unit-like struct
let unit_instance = MyUnitStruct;

// Struct with methods
impl MyStruct {
    fn new(field1: i32, field2: String) -> Self {
        Self { field1, field2 }
    }

    fn get_field1(&self) -> i32 {
        self.field1
    }
}


// Enum declaration
enum MyEnum {
    Variant1,
    Variant2(i32, String),
    Variant3 { field1: i32, field2: String },
}

// Using enum variants
let enum_instance1 = MyEnum::Variant1;
let enum_instance2 = MyEnum::Variant2(10, String::from("Enum"));
let enum_instance3 = MyEnum::Variant3 {
    field1: 20,
    field2: String::from("Struct-like Enum"),
};

// Matching on enum variants

// Immutable string slice
let s1: &str = "Hello, world!";

// Mutable String object
let mut s2: String = String::from("Hello, world!");

// Using to_string() method
let s3: String = "Hello, world!".to_string();

// Using format! macro
let s4: String = format!("Hello, {}!", "world");

// Concatenation with +
let s5: String = s2 + " How are you?";

// Using push_str method
let mut s6: String = String::from("Hello");
s6.push_str(", world!");

// Using push method
let mut s7: String = String::from("Hello");
s7.push('!');

// Using String::new() for an empty string
let s8: String = String::new();

// Using String::with_capacity() for a pre-allocated string
let mut s9: String = String::with_capacity(10);
s9.push_str("Hello");


// Infinite loop
loop {
    // Loop body
    if some_condition {
        break;
    }
    else if some_condition {
        s9.push_str("there");
        break
    }
    else {
        s9.push_str("there");
        break;
    }

}

// While loop
while some_condition {
    // Loop body
}

// For loop with a range
for i in 0..10 {
    // Loop body
}

// For loop with an iterator
let vec = vec![1, 2, 3, 4, 5];
for item in vec.iter() {
    // Loop body
}

// Loop with labels
'outer: loop {
    loop {
        break 'outer; // Breaks the outer loop
    }
}

// Loop with continue
for i in 0..10 {
    if i % 2 == 0 {
        continue; // Skips the rest of the loop body for even numbers
    }
    // Loop body
}

// Basic if statement
if condition {
    // Code to execute if condition is true
}

// If-else statement
if condition {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}

// If-else if-else statement
// If statement with a let binding
if let Some(value) = some_option {
    // Code to execute if some_option is Some
}

// Using if in a let statement (ternary-like)
let result = if condition {
    // Value if condition is true
    10
} else {
    // Value if condition is false
    20
};

// Match statement (alternative to if-else chains)
match some_value {
    1 => println!("Value is 1"),
    2 => println!("Value is 2"),
    _ => println!("Value is something else"),
}

// Basic struct with methods
struct MyStruct {
    field1: i32,
    field2: String,
}

impl MyStruct {
    // Associated function (like a static method)
    fn new(field1: i32, field2: String) -> Self {
        Self { field1, field2 }
    }

    // Method
    fn get_field1(&self) -> i32 {
        self.field1
    }

    // Mutable method
    fn set_field1(&mut self, value: i32) {
        self.field1 = value;
    }
}


// Struct with traits (like interfaces)
trait MyTrait {
    fn trait_method(&self) -> String;
}

impl MyTrait for MyStruct {
    fn trait_method(&self) -> String {
        format!("Field2 is: {}", self.field2)
    }
}


// Enum with methods
enum MyEnum {
    Variant1,
    Variant2(i32, String),
}

impl MyEnum {
    fn new_variant2(field1: i32, field2: String) -> Self {
        MyEnum::Variant2(field1, field2)
    }

    fn describe(&self) -> String {
        match self {
            MyEnum::Variant1 => String::from("This is Variant1"),
            MyEnum::Variant2(field1, field2) => format!("Variant2 with field1: {} and field2: {}", field1, field2),
        }
    }
}


struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

let rect = Rectangle::new(30, 50);


let add = |a, b| a + b;
let result = add(5, 3);

fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

let multiply_ptr: fn(i32, i32) -> i32 = multiply;
let result = multiply_ptr(4, 5);


fn main() {
    // Basic array declaration
    let arr = [1, 2, 3, 4, 5];

    // Array with explicit type and length
    let arr: [i32; 5] = [1, 2, 3, 4, 5];

    // Array with default values
    let arr = [0; 5]; // Creates an array of length 5, all elements initialized to 0

    // Accessing array elements
    let first = arr[0];
    let second = arr[1];

    // Iterating over an array
    for element in arr.iter() {
        println!("{}", element);
    }

    // Using arrays in functions
    fn sum(arr: [i32; 5]) -> i32 {
        let mut sum = 0;
        for &num in arr.iter() {
            sum += num;
        }
        sum
    }

    let arr = [1, 2, 3, 4, 5];
    let result = sum(arr);
    println!("Sum: {}", result);

    // Multidimensional arrays
    let matrix: [[i32; 3]; 2] = [
        [1, 2, 3],
        [4, 5, 6],
    ];

    // Slicing arrays
    let slice = &arr[1..3]; // Creates a slice containing elements at index 1 and 2
    println!("Slice: {:?}", slice);
}