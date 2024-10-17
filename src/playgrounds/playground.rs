
fn ass3(x: i32) -> i32 {
    x
}

let add = | x:i32, y: i32 | -> i32 {
    x + y
}

let add = |x,y| x + y;

struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn generic_function<T>(x: T) -> T {
    x
}

async fn get_data() -> String{
    "data".to_string()
}

extern "C" {
    fn some_c_function(x:i32) -> i32;
}