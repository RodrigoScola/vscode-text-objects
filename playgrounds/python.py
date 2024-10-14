def function1():
    return ""

lamblda = lambda x, y : x + y


def outer_fn(x):
    def inner_fn(y):
        return x + y
    return inner_fn(5)

class MyClass:
    def my_method(self, x, y):
        return x + y
