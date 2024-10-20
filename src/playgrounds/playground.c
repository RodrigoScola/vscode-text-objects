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