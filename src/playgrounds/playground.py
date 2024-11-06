


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
    await asyncio.sleep(1)
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
    count += 1

    
    
my_dict = {'a': 1, 'b': 2, 'c': 3}

my_dict.a= 3
for key, value in my_dict.items():
    print(f'Key: {key}, Value: {value}')

squares = [x ** 2 for x in range(10)]


arrr  = [1,2,3,4]

d = {
    "name": "hogh"
}
