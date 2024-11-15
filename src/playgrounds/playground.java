// 1. Regular method
public void myFunction() {
    // code
}

//this is a type
public interface MyInterface {
    void myInterfaceMethod();
}

// 8. Anonymous class method
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        // code
        // code
    }
};

// 9. Lambda expression (Java 8+)
Runnable lambda = () -> {
    // code
    // code
};

// 10. Method reference (Java 8+)
public abstract class MyClass {
    public static void myMethod() {
        // code
    }
}

Runnable methodRef = MyClass::myMethod;


import java.io.IOException;
import java.util.Optional;

public class MyClass {
    // 1. Regular method
    public void regularMethod() {
        System.out.println("This is a regular method.");
    }


    public static void main(String[] args) throws IOException {
        MyClass obj = new MyClass();

        // Calling different methods
        obj.regularMethod();
        staticMethod();
        obj.methodWithParams(10, "example");
        System.out.println("Return value: " + obj.methodWithReturnType());
        obj.methodWithVarArgs(1, 2, 3, 4);
        
        try {
            obj.methodWithThrows();

        } catch (IOException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
        
        obj.privateMethod();
        obj.protectedMethod();
        obj.finalMethod();
        obj.synchronizedMethod();
        System.out.println("Generic method: " + obj.genericMethod("Generic String"));
        System.out.println("Optional method: " + obj.optionalMethod().orElse("No value"));
        obj.overloadedMethod(5);
        obj.overloadedMethod("Overload");
        obj.anonymousClassMethod();
        obj.lambdaMethod();
        obj.methodReference();
    }
}


if (condition) {
    // code to be executed if condition is true
    // code to be executed if condition is true
}

if (condition) System.out.println("hello world");
else if (condition) System.out.println("hello world");
else System.out.println("hello world");

switch (variable) {
    case value1:
    case value2:
        // code to be executed if variable equals value2
        break;
    // you can have any number of case statements
    default:
        // code to be executed if variable doesn't match any case
}

variable = (condition) ? valueIfTrue : valueIfFalse;

String multiLineTextBlock = """
t       Hello, 
        World!
        This is a multiline string.
        """;

        char myChar = 'A';


// This is a single-line comment

/*
 * This is a multi-line comment
 * that spans multiple lines.
 */

/**
 * This is a Javadoc comment.
 * It is used to describe the class, method, or field.
 * 
 * @param paramName Description of the parameter
 * @return Description of the return value
 */
public class Example {
    // Single-line comment inside a method
    public void method() {
        /* Multi-line comment inside a method */
    }
}


for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

int[] arr = {1, 2, 3, 4, 5};
for (int num : arr) {
    System.out.println(num);
}

int i = 0;
while (i < 5) {
    System.out.println(i);
    i++;
}

int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 5);


import java.util.*;

import java.util.Arrays;

int[] arr = {1, 2, 3, 4, 5};
Arrays.stream(arr)
.forEach(System.out::println);


MyClass obj = new MyClass() {
    void display() {
        System.out.println("Anonymous class object");
    }
};

class MyClassOter implements Serializable {
    transient int transientVar = 100; // Transient variable
}


