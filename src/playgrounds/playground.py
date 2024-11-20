


def f(param1, two): 
    print('second')

def second(): 
    print('second')

add = lambda x,y : x + y

class MyClass:
    def my_method(self):
        print("This is a method inside a class.")


class OtherClass:
    @staticmethod
    def my_static_method():
        print("This is a static method.")

class MyClass2:
    @classmethod
    def my_class_method(cls):
        print("This is a class method.")



def my_generator():
    yield 1
    yield 2
    yield 3



async def my_async_function():
    print("Async function completed")


i = 1
i = 2



# htis is a comment
# this is anoterh

""" 
this is a docstring for python
"""


str = "3"



fruits = ['on1','tw2','thr3','fou4']

count = 0

while count < 5:
    if count == 3:
        print("the count is 4")
        print("the count is 4")
    elif count == 4:
        print("the count is 4")
    else: 
        print("the count is 4")
    count += 1


    
    
my_dict = {'a': 1, 'b': 2, 'c': 3}





result = "x is less than 5" if my_dict['c'] < 5 else "x is 5 or greater"
x = 4

result =  { "x is less than 5" } if x < 5 else { "x is 5 or greater" };


my_dict.a= 3
for key, value in my_dict.items():
    print(f'Key: {key}, Value: {value}')

squares = [x ** 2 for x in range(10)]


arrr  = [1,2,3,4]

d = {
    "name": "hogh"
}

def func(fn):
    return fn()

# Example function to be passed as an argument
def example_function():
    return 42

# Using a lambda function
lambda_function = lambda: 100

# Using the func function with example_function
result = func(example_function)
print("Result from example_function:", result)  # Output: Result from example_function: 42

# Using the func function with a lambda function
lambda_result = func(lambda_function)
print("Result from lambda_function:", lambda_result)  # Output: Result from lambda_function: 100

# Using the func function with an anonymous lambda function directly
anonymous_lambda_result = func(lambda: 84)
print("Result from anonymous lambda:", anonymous_lambda_result)  # Output: Result from anonymous lambda: 84

