// 1. Regular function definition
// Function with no return value and no parameters
// Function with no return value and no parameters
// Function with no return value and no parameters
// Function with no return value and no parameters
int add(int a, int b)
{
    int c = a + b;
    return a + b;
}

// 2. Inline function
inline int multiply(int a, int b)
{
    return a * b;
}

// 3. Lambda function (C++11)
auto divide = [](int a, int b)
{
    a = b;

    int c = a + b;

    return a / b;
};

// 4. Function pointer
int (*subtract)(int, int) = [](int a, int b)
{
    return a - b;
};

// 5. Function template
template <typename T>
T max(T a, T b)
{
    return (a > b) ? a : b;
}

// 6. Class member function
class Calculator
{
public:
    int multiply(int a, int b)
    {
        return a * b;
    }
};

// 7. Static member function
class Utils
{
public:
    static int subtract(int a, int b)
    {
        return a - b;
    }
};

// 8. Const member function
class Number
{
private:
    int otherValue;

public:
    int value;
    int getValue() const
    {
        return value;
    }
};

// todo this needs to be captured aswell
// todo in and out
//  9. Pure virtual function (abstract class)
class Operation
{
public:
    virtual int operate(int a, int b) = 0;
    virtual int operate2(int a, int b) = 0;
};

// 10. Function with default arguments
int power(int base, int exp = 2)
{
    int result = 1;
    for (int i = 0; i < exp; ++i)
        result *= base;
    return result;
}

// 11. Function with trailing return type (C++11)
auto mod(int a, int b) -> int
{
    return a % b;
}

// 12. Friend function
class Complex
{
    friend Complex addComplex(const Complex &a, const Complex &b);
    int real, imag;

public:
    Complex(int r, int i) : real(r), imag(i) {}
};

Complex addComplex(const Complex &a, const Complex &b)
{
    return Complex(a.real + b.real, a.imag + b.imag);
}

// 13. Lambda stored in std::function (C++11)
#include <functional>
std::function<int(int, int)> modulo = [](int a, int b)
{
    return a % b;
};

// 1. Traditional for loop
for (int i = 0; i < n; ++i)
{
    i = 4;
    // body
}

// 2. Range-based for loop (C++11)
for (int x : arr)
{
    // body
}

// 3. Range-based for loop with auto (C++11)
for (auto &x : arr)
{
    // body
}

// 4. Infinite for loop
for (;;)
{
    // body
}

// 5. For loop with multiple variables
for (int i = 0, j = n; i < j; ++i, --j)
{
    // body
}

// 6. For loop with pointer iteration
for (int *ptr = arr; ptr < arr + n; ++ptr)
{
    // body
}

// 7. Reverse iteration with for loop
for (int i = n - 1; i >= 0; --i)
{
    // body
}

// 8. For loop with conditional increment
for (int i = 0; i < n; i += 2)
{
    // body
}

// 9. For loop with break
for (int i = 0; i < n; ++i)
{
    if (i == 5)
        break;
    // body
}

// 10. For loop with continue
for (int i = 0; i < n; ++i)
{
    if (i == 2)
        continue;
    // body
}

// 1. Using std::string
std::string str = "Hello, world!";

// 2. Using character array
char str[] = "Hello, world!";

// 3. Using pointer to char
const char *str = "Hello, world!";

// 4. Using std::string constructor
std::string str("Hello, world!");

// 5. Using std::string literal (C++11)
std::string str = R"(Hello, world!)";

// 6. Using std::string_view (C++17)
std::string_view str = "Hello, world!";

// 7. Using std::wstring (wide string)
std::wstring wstr = L"Hello, world!";

// 8. Using std::u16string (UTF-16)
std::u16string u16str = u"Hello, world!";

// 9. Using std::u32string (UTF-32)
std::u32string u32str = U"Hello, world!";

// 1. Define a class with public members
class MyClass
{
public:
    int x;
    MyClass(int xVal) : x(xVal) {}
};

// 2. Define a class with private members and public methods
class MyClassAwesome
{
private:
    int x;

public:
    MyClassAwesome(int xVal) : x(xVal) {}
    int getX() { return x; }
};

MyClassAwesome *aosidjf = new MyClassAwesome(4);

int other = aosidjf->getX();

// 3. Define a struct (default public members)
struct MyStruct
{
    int x;
    double y;
};

func(fn : () = > number){
    return fn()}

MyStruct a = MyStruct{

};

// 4. Define a class with default constructor and destructor
class MyClass
{
public:
    MyClass() = default;
    ~MyClass() = default;
};

// 5. Define an object with member initializer list
MyClass obj1{10};       // for class
MyStruct obj2{5, 3.14}; // for struct

// 6. Define a struct with a constructor
struct MyStruct
{
    int x;
    double y;
    MyStruct(int xVal, double yVal) : x(xVal), y(yVal) {}
};

// 7. Define a struct with methods
struct MyStruct
{
    int x;
    double y;
    void display() { std::cout << x << ", " << y << std::endl; }
};

// 8. Define a struct using typedef
typedef struct MyStruct
{
    int x;
    double y;
} MyStructAlias;

// 9. Define an object using new (dynamic allocation)
MyClass *obj = new MyClass(10);

// 10. Define a struct with in-class initialization (C++11)
struct MyStruct
{
    int x = 5;
    double y = 2.5;
};

// 11. Define a class or struct with default, copy, and move constructors
class MyClass
{
public:
    MyClass() = default;                // Default constructor
    MyClass(const MyClass &) = default; // Copy constructor
    MyClass(MyClass &&) = default;      // Move constructor
};

// 12. Anonymous struct (for quick use)
struct
{
    int x;
    double y;
} myStruct = {5, 3.14};

// 1. Basic type definition
int x = 10;

// 2. Uninitialized variable
int y;

// 3. Constant variable
const int z = 20;

// 4. Static variable
static int w = 30;

// 5. Reference variable
int a = 40;
int &refA = a;

// 6. Pointer variable
int *ptr = &a;

// 7. Auto type deduction (C++11)
auto b = 50;

// 8. Mutable variable inside const method (C++11)
class MyClass
{
public:
    mutable int c = 60;
};

// 9. Volatile variable
volatile int d = 70;

// 10. Thread-local variable (C++11)
thread_local int e = 80;

// 11. Register variable (Deprecated in C++17)
register int f = 90;

// 12. Array variable
int arr[5] = {1, 2, 3, 4, 5};

// 13. Global variable
int g = 100;

// 14. Extern variable (declared elsewhere)
extern int h;

// 15. Double or float variable
double pi = 3.14159;
float fval = 9.81f;

// 16. Boolean variable
bool flag = true;

// 17. Char variable
char letter = 'A';

// 18. Wide char variable
wchar_t wideChar = L'B';

// 19. std::string variable
std::string str = "Hello";

// 20. std::array variable (C++11)
std::array<int, 5> arr2 = {1, 2, 3, 4, 5};

// 21. std::vector variable
std::vector<int> vec = {1, 2, 3, 4, 5};

// 22. Enum variable
enum Color
{
    Red,
    Green,
    Blue
};
Color myColor = Green;

// 23. std::pair variable
std::pair<int, std::string> myPair = {1, "Hello"};

// 24. std::tuple variable (C++11)
std::tuple<int, double, std::string> myTuple = {1, 3.14, "World"};

// 25. std::optional variable (C++17)
std::optional<int> opt = 10;

// 26. std::variant variable (C++17)
std::variant<int, std::string> var = 42;

// 27. std::bitset variable
std::bitset<8> bits(0b1100);

// 28. Lambda capturing variable (C++11)
auto myLambda = [x]()
{ return x; };

// 29. nullptr (C++11)
int *nullPtr = nullptr;

// 1. Basic types
int x = 10;
double y = 3.14;
char z = 'A';
bool flag = true;

// 2. Const types
const int cx = 20;
const double cy = 6.28;

// 3. Static types
static int sx = 30;
static double sy = 9.42;

// 4. Pointer types
int *ptr = &x;
double *dptr = &y;
char *cptr = &z;

// 5. Reference types
int &ref = x;
double &dref = y;

// 6. Array types
int arr[5] = {1, 2, 3, 4, 5};
double darr[3] = {1.1, 2.2, 3.3};
char carr[] = "Hello";

// 7. Array of pointers
int *parr[3] = {&x, &sx, &cx};

// 8. Function return types
int add(int a, int b)
{
    return a + b;
}
double multiply(double a, double b)
{
    return a * b;
}

// 9. Void return type
void doSomething() {}

// 10. Reference return type
int &increment(int &a)
{
    return ++a;
}

// 11. Const return type
const int getValue()
{
    return 100;
}

// 12. Array return type
int *getArray()
{
    static int arr[5] = {1, 2, 3, 4, 5};
    return arr;
}

// 13. Pointer return type
int *getPointer(int &a)
{
    return &a;
}

// 14. Function pointer type
int (*funcPtr)(int, int) = add;

// 15. Auto type (C++11)
auto xAuto = 42;
auto yAuto = 3.14;
auto zAuto = "Auto";

// 16. Function returning auto (C++14)
auto getAuto() -> int
{
    return 42;
}

// 17. Template types
template <typename T>
T max(T a, T b)
{
    return (a > b) ? a : b;
}

// 18. Struct types
struct MyStruct
{
    int a;
    double b;
};
MyStruct obj;

// 19. Class types
class MyClass
{
public:
    int a;
    double b;
};
MyClass myObj;

// 20. Enum types
enum Color
{
    Red,
    Green,
    Blue
};
Color myColor = Red;

// 21. Enum class types (C++11)
enum class Fruit
{
    Apple,
    Banana,
    Cherry
};
Fruit myFruit = Fruit::Banana;

// 22. Lambda types (C++11)
auto lambda = [](int a, int b)
{ return a + b; };

// 23. Function with template return type
template <typename T>
T getValue(T val)
{
    return val;
}

// 24. Type aliasing with typedef
typedef int myInt;
myInt aliasX = 10;

// 25. Type aliasing with using (C++11)
using myDouble = double;
myDouble aliasY = 5.67;

// 26. std::string type
std::string str = "Hello";

// 27. std::array type (C++11)
std::array<int, 3> arr2 = {1, 2, 3};

// 28. std::vector type
std::vector<int> vec = {1, 2, 3, 4, 5};

// 29. std::pair type
std::pair<int, double> p = {1, 3.14};

// 30. std::tuple type (C++11)
std::tuple<int, double, std::string> tpl = {1, 2.5, "Tuple"};

// 31. std::optional type (C++17)
std::optional<int> opt = 10;

// 32. std::variant type (C++17)
std::variant<int, std::string> var = 42;

// 33. std::bitset type
std::bitset<8> bits(0b10101010);

// 34. decltype (C++11)
decltype(x) newX = 100;

// 35. std::nullptr_t (C++11)
std::nullptr_t nptr = nullptr;

// 36. std::shared_ptr (C++11)
std::shared_ptr<int> sptr = std::make_shared<int>(42);

// 37. std::unique_ptr (C++11)
std::unique_ptr<int> uptr = std::make_unique<int>(42);

// 38. std::weak_ptr (C++11)
std::weak_ptr<int> wptr = sptr;

// 39. Union type
union MyUnion
{
    int i;
    double d;
};
MyUnion u;
u.i = 10;

// 40. Function return array type (C-style)
int *returnArray()
{
    static int arr[3] = {1, 2, 3};
    return arr;
}

// 41. Pointer to function type
using FuncPtr = int (*)(int, int);
FuncPtr fptr = add;

// 42. constexpr types (C++11)
constexpr int constExprVar = 100;

// 43. volatile types
volatile int volVar = 200;

// 44. std::function type (C++11)
std::function<int(int, int)> func = add;

#include <iostream>
#include <string>

void helloer(const std::string &message)
{
    std::cout << message << std::endl;
}

int main()
{
    std::string greeting = "Hello, World!";
    helloer(greeting);
    return 0;
}

int arr1[5];
int arr2[] = {1, 2, 3, 4, 5};
int arr3[5] = {1, 2, 3, 4, 5};
std::array<int, 5> arr4;
std::array<int, 5> arr5 = {1, 2, 3, 4, 5};
std::vector<int> arr6(5);
std::vector<int> arr7 = {1, 2, 3, 4, 5};

class MyClass
{
public:
    int myVar;
    void myMethod() {}
};

class MyClass
{
public:
    MyClass() {}
    ~MyClass() {}
};

class MyClass
{
public:
    MyClass(int x) : myVar(x) {}

private:
    int myVar;
};

struct MyStruct
{
    int myVar;
    void myMethod() {}
};

MyStruct gf = MyStruct{
    myVar : 3
};

class MyClass
{
public:
    MyClass() = default;
    ~MyClass() = default;
};

class MyClass
{
public:
    MyClass(const MyClass &other) = delete;
    MyClass &operator=(const MyClass &other) = delete;
};

// if statement with initialization (C++17)
if (auto value = someFunction(); value > threshold)
{
    // code to execute if value is greater than threshold
    // code to execute if value is greater than threshold
}
else
{

    // code to execute if value is greater than threshold
    // code to execute if value is greater than threshold
}

bool condition = false;

// Ternary operator
condition ? true_expression : false_expression;

if (condition)
{
    doSomething();
}

else if (condition)
{
    doSomething();
}
else if (condition)
{
    doSomething();
}
else
{
    doSomething();
}

if (condition)
    doSomething();
else if (condition)
    doSomething();
else
    doSomething();

// Define the function that takes a std::function<int()> and calls it
int func(std::function<int()> fn)
{
    return fn();
}

// Example function to be passed as an argument
int exampleFunction()
{
    return 42;
}

int main()
{
    // Call func with exampleFunction
    int result = func(exampleFunction);
    std::cout << "Result: " << result << std::endl; // Output: Result: 42

    MyClassAwesome *b = new MyClassAwesome(0);

    int c = b->getX();

    // Call func with a lambda function
    int lambdaResult = func([]()
                            { return 100; });
    std::cout << "Lambda Result: " << lambdaResult << std::endl; // Output: Lambda Result: 100

    return 0;
}

#include <iostream>

int main()
{
    int number = 2;

    switch (number)
    {
    case 1:
        std::cout << "Number is 1" << std::endl;
        break;
    case 2:
        std::cout << "Number is 2" << std::endl;
        break;
    case 3:
        std::cout << "Number is 3" << std::endl;
        break;
    default:
        std::cout << "Number is not 1, 2, or 3" << std::endl;
        break;
    }

    return 0;
}