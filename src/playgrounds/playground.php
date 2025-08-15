
<?php
// Simple PHP Example

// Variables
$name = "Alice";
$age = 25;

// Function
function greet($personName, $personAge) {
    return "Hello, $personName! You are $personAge years old.";
}

// Call the function
$message = greet($name, $age);

// Output
echo $message . "<br>";

// Array
$fruits = ["Apple", "Banana", "Cherry"];

// Loop
foreach ($fruits as $fruit) {
    echo "I like $fruit.<br>";
}

// Conditional
if ($age >= 18) {
    echo "You are an adult.";
} else {
    echo "You are underage.";
}
?>
