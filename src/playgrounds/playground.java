// // 1. Regular method
// public void myFunction() {
//     // code
// }

// //this is a type
// public interface MyInterface {
//     void myInterfaceMethod();
// }

// // 8. Anonymous class method
// Runnable runnable = new Runnable() {
//     @Override
//     public void run() {
//         // code
//         // code
//     }
// };

// // 9. Lambda expression (Java 8+)
// Runnable lambda = () -> {
//     // code
//     // code
// };

// // 10. Method reference (Java 8+)
// public abstract class MyClass {
//     public static void myMethod() {
//         // code
//     }
// }

// Runnable methodRef = MyClass::myMethod;


// import java.io.IOException;
// import java.util.Optional;




// if (othercondition)  System.out.println();



// if (condition){ System.out.println("hello world"); }

// else if (condition) {System.out.println("hello world");}
// else {System.out.println("hello world");}


// switch (variable) {
//     case value1:
//     case value2:
//         // code to be executed if variable equals value2
//         break;
//     // you can have any number of case statements
//     default:
//         // code to be executed if variable doesn't match any case
// }

// variable = (condition) ? valueIfTrue : valueIfFalse;

// String multiLineTextBlock = """
// t       Hello, 
//         World!
//         This is a multiline string.
//         """;

//         multiLineTextBlock = """hello"""

//         char myChar = 'A';


// // This is a single-line comment

// /*
//  * This is a multi-line comment
//  * that spans multiple lines.
//  */

// /**
//  * This is a Javadoc comment.
//  * It is used to describe the class, method, or field.
//  * 
//  * @param paramName Description of the parameter
//  * @return Description of the return value
//  */
// public class Example {
//     // Single-line comment inside a method
//     public int method() {
//         /* Multi-line comment inside a method */
//         return 4;

//     }
// }


// for (int i = 0; i < 5; i++) {
//     System.out.println(i);
// }

// int[] arr = {1, 2, 3, 4, 5};
// for (int num : arr) {
//     System.out.println(num);
// }

// int i = 0;
// while (i < 5) {
//     System.out.println(i);
//     i++;
// }

// Example ex = new Example();

// int e = ex.method();

// int i = 0;
// do {
//     System.out.println(i);
//     i++;
// } while (i < 5);


// import java.util.*;

// import java.util.Arrays;

// int[] arr = {1, 2, 3, 4, 5};


// Arrays.stream(arr) .forEach(System.out::println);


// MyClass obj = new MyClass() {
//     void display() {
//         System.out.println("Anonymous class object");
//     }
// };

// class MyClassOter implements Serializable {
//     transient int transientVar = 100; // Transient variable
// }


// public class Main {
//     // public static int func(IntSupplier fn) {
//     //     return fn.get();
//     // }

//     public static void main(String[] args) {
//         // Using a lambda expression
//         IntSupplier lambda = () -> 42;

//         int d = func(lambda);


//         System.out.println("Result from lambda: " + func(lambda)); // Output: Result from lambda: 42


//         // Using a method reference
//         IntSupplier methodRef = Main::exampleFunction;
//         // System.out.println("Result from method reference: " + func(methodRef)); // Output: Result from method reference: 100

//         // Using an anonymous class
//         IntSupplier anonymousClass = new IntSupplier() {
//             @Override
//             public int get() {
//                 return 84;
//             }
//         };
//         // System.out.println("Result from anonymous class: " + func(anonymousClass)); // Output: Result from anonymous class: 84
//     }

//     public static int exampleFunction() {
// try {
// } catch(err Exception)  {
// }

//         return 100;
//     }
// }

public class Count {
    public boolean has(int[] haystack, int needle, int count) { 
        if (count >= haystack.length ){ 
            return false;
        } else if (haystack[count] === needle) {
            return true
        } else {
            return has(haystack, needle, count++);
        }
    }

    public int count(int[] haystack, int needle, int count ) {
        if (!has(haystack, needle, count) || count >= haystack.length) {
            return 0;
        }
        int c= 0;
        if (array[count] == needle) {
            c++;
        }
        c += count(haystack, needle, count);
        return c;
    }

}
public static void main (String[] args) { 
    int[] haystack = {2,3,5,6,9,7,8,8,9};
    Count co = new Count();
    System.out.println(co.count(haystack,5,0));
}
