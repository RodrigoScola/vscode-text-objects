<?php

// Variables
// Variables
$name = "Alice";
$age = 25;

//arrays
$fruits = ["Apple", "Banana", "Cherry"];

?>
<?php
[$f, $g, $b, $c, $d, $e,] = [1, 2, 3, 4, 5, 6, 7, 8]

    ?>
//function calls
?>
<?php
$message = greet($name, $age);
?>
greet($name, $age);

?>

<?php

//classes

class Person
{
    public function greet()
    {
        return "Hello from anonymous class";
    }
    public function greet2()
    {
        return "Hello from anonymous class";
    }
}

$anon = new class {
    public function greet()
    {
        return "Hello from anonymous class";
    }
};

?>

<?php

// This is a single-line comment

# This is also a single-line comment

/*
  This is a multi-line comment
  It can span multiple lines
*/

/**
 * Class Person
 *
 * @package MyApp
 * @author Alice
 */

?>

<?php
$age = 18;

// if ($age >= 18) {
//   echo "Adult";
// }

if ($age >= 18) {
    echo "Adult";
} else
    echo "Minor";

?>
<?php
$status = ($age >= 18) ? "Adult" : "Minort";
?>
<?php

switch ($day) {
    case 1:
        echo "Monday";
        break;
    case 2:
        echo "Tuesday";
        break;
    case 3:
        echo "Wednesday";
        break;
    default:
        echo "Other day";
}


if ($age >= 18):
    echo "Adult";
else:
    echo "Minor";
endif;

$username = $inputUsername ?: "Guest";

?>
<?php

$grade = match (true) {
    $score >= 90 => 'A',
    $score >= 75 => 'B',
    $score >= 60 => 'C',
    default => 'F',
};

?>

<?php function greet($name, $age)
{
    return "Hello, $name";
}
?>
<?php

function add(int $a, int $b = 9): int
{
    return $a + $b;
}
?>
<?php

$greet = function (...$name) {
    return "Hello, $name";
};
?>
<?php

$squared = array_map(function ($n) {
    return $n ** 2;
}, $numbers);

?>
<?php
$greet = fn($name) => "Hello, $name";
?>
<?php

class MathUtils
{
    public static function add($a, $b)
    {
        return $a + $b;
    }


}



?>

<?php

for ($i = 0; $i < 5; $i++) {
    echo $i;
} ?>
<?php

$fruits = ["apple", "banana", "cherry"];

foreach ($fruits as $fruit) {
    echo $fruit;
}

foreach ($fruits as $index => $fruit) {
    echo "$index: $fruit";
}


?>
<?php
$i = 0;
while ($i < 5) {
    echo $i;
    $i++;
}

?>

<?php
$i = 0;
do {
    echo $i;
    $i++;
} while ($i < 5);

?>

<?php $arr = ["name" => "Rodrigo", "age" => 30]; ?>

<?php
$str = 'Hello World';
$str2 = "Line 1\nLine 2";
$str = <<<EOD
Hello $name
This is a multi-line string
EOD;
?>
<?php
$str = <<<'EOD'
Hello $name
This is literal text
EOD;
?>

<?php

interface A
{
}

interface b
{
}
function foo(A&B $name)
{
    // $value can be int OR string
}
?>