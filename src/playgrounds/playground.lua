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

-- Function with parameters
function myFunctionWithParams(param1, param2)
    print(param1, param2)
end

-- Function with return value
function myFunctionWithReturn()
    return "Hello, Return World!"
end