// Function with no return value and no parameters
void functionName()
{
    // function body
}

// Function declaration (prototype)
void functionName(int param1, float param2);

// Function pointer
void (*functionPointer)(int, float);

// Inline function
inline int functionName(int param1, float param2)
{
    // function body
    return param1;
}

functionName();

// Calling a function with parameters
functionName(param1, param2);

// Calling a function and using its return value
int result = functionName(param1, param2);

// Calling a function through a function pointer
functionPointer(param1, param2);

// Calling a function within another function
void anotherFunction()
{
    functionName(param1, param2);
}

int arr2[5] = {1, 2, 3, 4, 5};

// Define a struct
struct Point
{
    int x;
    int y;
};

// Create a struct variable
struct Point p1;

typedef struct
{
    int x;
    int y;
} Point2;

const result = condition ? valueIfTrue : valueIfFalse;

// Simple if statement
if (condition)
{
    // code to execute if condition is true
}
else
{
    // code to execute if condition is true
}

// Standard for loop
for (int i = 0; i < 10; i++)
{
    // code to execute
}

// For loop with multiple variables

// For loop with no initialization
// Standard for loop
for (int i = 0; i < 10; i++)
{
    // code to execute
}

// here
//  For loop with multiple variables
for (int i = 0, j = 10; i < j; i++, j--)
{
    // code to execute
}

// For loop with no initialization
for (int i = 0; i < 10; i++)
{
    // code to execute
}

// For loop with no condition (infinite loop)
for (int i = 0;; i++)
{
    // code to execute
    if (i >= 10)
        break; // exit condition
}

// For loop with no increment
for (int i = 0; i < 10;)
{
    // code to execute
    i++; // manual increment
}

// For loop with all parts omitted (infinite loop)
for (;;)
{
    // code to execute
    break; // exit condition
}

// Nested for loop
for (int i = 0; i < 5; i++)
{
    for (int j = 0; j < 5; j++)
    {
        // code to execute
    }
}

// For loop with array
int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++)
{
    // code to execute with arr[i]
}
for (; i < 10; i++)
{
    // code to execute
    while (;;)
    {
    }
}

// For loop with no condition (infinite loop)
for (int i = 0;; i++)
{
    // code to execute
    if (i >= 10)
        break; // exit condition
}

// For loop with no increment
for (int i = 0; i < 10;)
{
    // code to execute
    i++; // manual increment
}

// For loop with all parts omitted (infinite loop)
for (;;)
{
    // code to execute
    break; // exit condition
}

// Nested for loop
for (int i = 0; i < 5; i++)
{
    for (int j = 0; j < 5; j++)
    {
        // code to execute
    }
}

// For loop with array
int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++)
{
    // code to execute with arr[i]
}

// Standard while loop
int i = 0;
while (i < 10)
{
    // code to execute
    i++;
}

// Infinite while loop
while (1)
{
    // code to execute
    break; // exit condition
}

// while loop with complex condition
int a = 0, b = 10;
while (a < b && b > 0)
{
    // code to execute
    a++;
    b--;
}

// Nested while loops
int x = 0;
while (x < 5)
{
    int y = 0;
    while (y < 5)
    {
        // code to execute
        y++;
    }
    x++;
}

// do-while loop (executes at least once)
int j = 0;
do
{
    // code to execute
    j++;
} while (j < 10);

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// String as a character array
char str1[] = "Hello, World!";

// String as a pointer to a constant string
const char *str2 = "Hello, World!";

// Dynamic string allocation using malloc
char *str3 = (char *)malloc(50 * sizeof(char));
strcpy(str3, "Hello, World!");

// Dynamic string allocation using calloc (initializes all elements to zero)
char *str4 = (char *)calloc(50, sizeof(char));
strcpy(str4, "Hello, World!");

// String using a character array with manual initialization
char str5[13] = {'H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', '!'};

// String using a character array with partial initialization (remaining elements are zero)
char str6[50] = "Hello, World!";

// String using a pointer and manual memory allocation
char *str7 = (char *)malloc(50 * sizeof(char));
sprintf(str7, "Hello, World!");

// String using snprintf for safe formatting
char str8[50];
snprintf(str8, sizeof(str8), "Hello, World!");

// Basic data types
int a = 10;
float b = 3.14;
double c = 3.14159;
char d = 'A';

// Unsigned types
unsigned int e = 20;
unsigned char f = 'B';

// Short and long types
short g = 5;
long h = 100000L;
long long i = 10000000000LL;

// Boolean type (requires stdbool.h)
#include <stdbool.h>
bool j = true;

// Pointer variables
int *k = &a;
float *l = &b;

// Array variables
int m[5] = {1, 2, 3, 4, 5};
char n[6] = "Hello";

// Struct variables
struct Point
{
    int x;
    int y;
};
struct Point p1 = {10, 20};

// Typedef struct variables
typedef struct
{
    int x;
    int y;
} Point2;
Point2 p2 = {30, 40};

// Enum variables
enum Color
{
    RED,
    GREEN,
    BLUE
};
enum Color color = RED;

// Union variables
union Data
{
    int intValue;
    float floatValue;
    char charValue;
};

union Data data;
data.intValue = 10;

// Volatile variables
volatile int o = 0;

// Static variables
static int p = data.intValue;

extern int q;

// Single-line comment
int a = 10; // This is a single-line comment

/*
Multi-line comment
This comment spans multiple lines
*/
int b = 20;

/*
 * Multi-line comment with asterisks
 * This is another style for multi-line comments
 */
int c = 30;