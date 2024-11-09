
-- Function declaration using the function keyword
-- Function declaration using the function keyword
-- Function declaration using the function keyword
function myFunction()
    print("Hello, World!")
end


-- Function declaration with local scope
local function myLocalFunction()
    print("Hello, Local World!")
end

-- Anonymous function assigned to a variable
myanonymousfunction = function()
    print("hello, anonymous world!")
end

-- Function as a table field
myTable = {
    myTableFunction = function()
        print("Hello, Table World!")
    end
}

-- Function with parameterlocal 
function myFunctionWithParams(param1, param2)
    print(param1, param2)
end

-- Function with return value
function myFunctionWithReturn()
    return "Hello, Return World!"
end

function MyClass(value)
    local self = {}
    local privateValue = value

    function self:getValue()
        return privateValue
    end

    return self
end
condition = true

if condition then
    inte =2
    inte++
    -- code to execute if condition is true
end

while condition do
    inte = 2
    inte = 4
    -- code to execute as long as condition is true
end

repeat

    inte = 2
    inte = 4
    -- code to execute at least once and then repeatedly until condition is true
until condition

for i = 1, 10, 1 do
    print(i)
end

for key, value in pairs(table) do
    -- code to execute for each key-value pair in the table
end

local i = 1
while i <= 10 do
    print(i)
    i = i + 1
end


local x = 10

yy = 20

local t = {}

local function add(a, b)
    return a + b
end

local result = add(5, 7)
print(result)  -- Output: 12

local array = {1, 2, 3, 4, 5}