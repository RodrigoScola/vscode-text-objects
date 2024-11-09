// Basic function
public void myfunction() {
    // code
}

// function with parameters
public void myfunction(int param1, string param2) {
    // code
}

// Function with return type
public int MyFunction() {
    // code
    return 42;
}

// Static function
public static void MyFunction() {
    // code
}

// Function with default parameters
public void MyFunction(int param1 = 10) {
    // code
}

// Function with expression body
public int MyFunction() => 42;

// Generic function
public T MyFunction<T>(T param) {
    return param;
}

// Async function
public async Task MyFunctionAsync() {
    await Task.Delay(1000);
}

// Function with out parameter
public void MyFunction(out int result) {
    result = 42;
}

// Function with ref parameter
public void MyFunction(ref int param) {
    param = 42;
}
// Static Function
public static int MyStaticFunction() {
    return 42;
}

// Function with Parameters
public int MyFunctionWithParams(int a, int b) {
    return a + b;
}

// Function with Default Parameters
public int MyFunctionWithDefaultParams(int a, int b = 10) {
    return a + b;
}

// Function with Named Parameters
public int MyFunctionWithNamedParams(int a, int b) {
    return a + b;
}
// Usage: MyFunctionWithNamedParams(a: 5, b: 10);

// Function with Optional Parameters
public int MyFunctionWithOptionalParams(int a, int b = 10) {
    return a + b;
}

// Function with Variable Number of Parameters (params)
public int MyFunctionWithParamsArray(params int[] numbers) {
    return numbers.Sum();
}

// Function with Local Functions
public int MyFunctionWithLocalFunction(int a, int b) {
    int LocalFunction(int x, int y) {
        return x + y;
    }
    return LocalFunction(a, b);
}

// Lambda Expressions
Func<int, int, int> add = (a, b) => a + b;


int age = 30;
string str3 = $"I am {age} years old.";

char[] charArray = { 'H', 'e', 'l', 'l', 'o' };
string str2 = new string(charArray);

string str1 = "Hello, World!";

// For loop
for (int i = 0; i < array.Length; i++) {
    Console.WriteLine(array[i]);
    Console.WriteLine(array[i]);
}

// Foreach loop
foreach (var item in array) {
    Console.WriteLine(item);
}

// While loop
int i = 0;
while (i < array.Length) {
    Console.WriteLine(array[i]);
    i++;
}

// Do-while loop
int j = 0;
do {
    Console.WriteLine(array[j]);
    j++;
} while (j < array.Length);

// Parallel.For loop
Parallel.For(0, array.Length, i => {
    Console.WriteLine(array[i]);
});

// LINQ ForEach
array.ToList().ForEach(item => Console.WriteLine(item));

// Using IEnumerator
IEnumerator enumerator = array.GetEnumerator();
while (enumerator.MoveNext()) {
    Console.WriteLine(enumerator.Current);
}

int x = 10;
int y = 20;

// If statement
if (x < y) {
    Console.WriteLine("x is less than y");
}

// If-else statement
if (x > y) {
    Console.WriteLine("x is greater than y");
} else {
    Console.WriteLine("x is not greater than y");
}

// If-else if-else statement
if (x > y) {
    Console.WriteLine("x is greater than y");
} else if (x == y) {
    Console.WriteLine("x is equal to y");
} else {
    Console.WriteLine("x is less than y");
}

// Switch statement
switch (x) {
    case 5:
        Console.WriteLine("x is 5");
        break;
    case 10:
        Console.WriteLine("x is 10");
        break;
    default:
        Console.WriteLine("x is neither 5 nor 10");
        break;
}

int x = 10;
int y = 20;

// Ternary operator
string result = (x < y) ? "x is less than y" : "x is not less than y";
Console.WriteLine(result);

// 1. Using array initializer
int[] array1 = { 1, 2, 3, 4, 5 };

// 2. Using the new keyword with array initializer
int[] array2 = new int[] { 1, 2, 3, 4, 5 };

// 3. Using the new keyword with specified size
int[] array3 = new int[5];

// 4. Using the new keyword with specified size and initializing elements
int[] array4 = new int[5] { 1, 2, 3, 4, 5 };

// 5. Using Array.CreateInstance method
Array array5 = Array.CreateInstance(typeof(int), 5);

// 6. Using Enumerable.Range to create and convert to array
int[] array6 = Enumerable.Range(1, 5).ToArray();

// 7. Using Array.Empty method
int[] array7 = Array.Empty<int>();

// 8. Using Array.ConvertAll method
string[] stringArray = { "1", "2", "3" };
int[] array8 = Array.ConvertAll(stringArray, int.Parse);

// 9. Using Array.Copy method
int[] array9 = new int[5];
Array.Copy(array1, array9, array1.Length);

// 10. Using Array.Clone method
int[] array10 = (int[])array1.Clone();

// 1. Basic Class Definition
public class BasicClass
{
}

// 2. Class with Properties
public class ClassWithProperties
{
    public int Id { get; set; }
    public string Name { get; set; }
}

// 3. Class with Methods
public class ClassWithMethods
{
    public void DisplayMessage()
    {
        Console.WriteLine("Hello, World!");
    }
}

// 4. Class with Constructor
public class ClassWithConstructor
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ClassWithConstructor(int id, string name)
    {
        Id = id;
        Name = name;
    }
}

// 5. Static Class
public static class StaticClass
{
    public static void DisplayMessage()
    {
        Console.WriteLine("Hello from Static Class!");
    }
}

// 6. Abstract Class
public abstract class AbstractClass
{
    public abstract void AbstractMethod();
}

// 7. Sealed Class
public sealed class SealedClass
{
    public void DisplayMessage()
    {
        Console.WriteLine("Hello from Sealed Class!");
    }
}

// 8. Partial Class
public partial class PartialClass
{
    public void Method1()
    {
        Console.WriteLine("Method1 from Partial Class");
    }
}

public partial class PartialClass
{
    public void Method2()
    {
        Console.WriteLine("Method2 from Partial Class");
    }
}

// 9. Generic Class
public class GenericClass<T>
{
    public T Value { get; set; }

    public GenericClass(T value)
    {
        Value = value;
    }
}

// Using the default constructor
MyClass obj1 = new MyClass();

// Using a parameterized constructor
MyClass obj2 = new MyClass(10, "example");

// Using an object initializer
MyClass obj3 = new MyClass { Property1 = 10, Property2 = "example" };

public class MyClass {
    private static readonly Lazy<MyClass> _instance = new Lazy<MyClass>(() => new MyClass());

    public static MyClass Instance => _instance.Value;

    private MyClass() { }
}

MyClass obj9 = MyClass.Instance;

var obj10 = new { Property1 = 10, Property2 = "example" };

public struct MyStruct {
    public int Property1;
    public string Property2;
}

MyStruct obj12 = new MyStruct { Property1 = 10, Property2 = "example" };

// Using a simple variable declaration and initialization
int number = 5;
string text = "Hello, World!";
bool isTrue = true;

// Using the 'var' keyword for implicit typing
var implicitNumber = 10;
var implicitText = "Implicit Hello";
var implicitBool = false;

// Using a constant
const double pi = 3.14159;

// Using nullable types
int? nullableInt = null;
double? nullableDouble = 3.14;

// Using arrays
int[] numbers = { 1, 2, 3, 4, 5 };
string[] texts = new string[3] { "one", "two", "three" };

// Using lists
List<int> numberList = new List<int> { 1, 2, 3, 4, 5 };
List<string> textList = new List<string> { "one", "two", "three" };

// Using dictionaries
Dictionary<int, string> numberDictionary = new Dictionary<int, string>
{
    { 1, "one" },
    { 2, "two" },
    { 3, "three" }
};

// Using tuples
var tuple = (1, "one", true);

// Using anonymous types
var anonymousType = new { Property1 = 10, Property2 = "example" };

// Using object initializers
MyClass obj = new MyClass { Property1 = 10, Property2 = "example" };

// Using structs
MyStruct myStruct = new MyStruct { Property1 = 10, Property2 = "example" };

// Using enums
DayOfWeek today = DayOfWeek.Monday;

/*
This is a multi-line comment.
It can span multiple lines.
*/
// Using dynamic types
dynamic dynamicVariable = 1;
dynamicVariable = "Now I'm a string";

// This is a single-line comment


/// <summary>
/// This is an XML documentation comment.
/// It is used to describe a type or a member.
/// </summary>
/// <param name="a">Description of parameter a</param>
/// <param name="b">Description of parameter b</param>
/// <returns>Description of the return value</returns>
public int MyFunctionWithParams(int a, int b) {
    return a + b;
}

using System;

public class MyClass {
    public int Property1 { get; set; }
    public string Property2 { get; set; }
}

public struct MyStruct {
    public int Property1 { get; set; }
    public string Property2 { get; set; }
}

public enum DayOfWeek {
    Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}

public record MyRecord(int Property1, string Property2);

public class Program {
    public static void Main() {
        // Using classes
        MyClass obj = new MyClass();
        obj.Property1 = 10;
        obj.Property2 = "example";

        // Using object initializers
        MyClass obj2 = new MyClass { Property1 = 10, Property2 = "example" };

        // Using anonymous types
        var anonymousType = new { Property1 = 10, Property2 = "example" };

        // Using structs
        MyStruct myStruct = new MyStruct { Property1 = 10, Property2 = "example" };

        // Using tuples
        var tuple = (Property1: 10, Property2: "example");

        // Using dynamic types
        dynamic dynamicVariable = new { Property1 = 10, Property2 = "example" };

        // Using enums
        DayOfWeek today = DayOfWeek.Monday;

        // Using records
        MyRecord myRecord = new MyRecord(10, "example");

        // Output examples
        Console.WriteLine($"Class: {obj.Property1}, {obj.Property2}");
        Console.WriteLine($"Anonymous Type: {anonymousType.Property1}, {anonymousType.Property2}");
        Console.WriteLine($"Struct: {myStruct.Property1}, {myStruct.Property2}");
        Console.WriteLine($"Tuple: {tuple.Property1}, {tuple.Property2}");
        Console.WriteLine($"Dynamic: {dynamicVariable.Property1}, {dynamicVariable.Property2}");
        Console.WriteLine($"Enum: {today}");
        Console.WriteLine($"Record: {myRecord.Property1}, {myRecord.Property2}");
    }
}