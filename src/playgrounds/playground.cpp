int add(int a, int b)
{
    return a + b;
}

inline int add(int a, int b)
{
    return a + b;
}

auto add = [](int a, int b)
{ return a + b; };

int (*funcptr)(int, int) = add;

class Calc
{
public:
    int value;
    Calc(int val) : value(val) {};
    int add(int a, int b)
    {
        return a + b;
    }
    virtual void show()
    {
    }
};

template <typename T>
T add(T a, T b)
{
    return a + b;
}

class Other
{
private:
    int value;

public:
    Other(int val) : value(val) {}
    friend void prinValue(Other obj);
};

void prinValue(Other obj)
{
}

struct Add
{
    int operator()(int a, int b)
    {
        return a + b;
    }
};