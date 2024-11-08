package main

import (
	"fmt"
)

func main() {

}

func callOther() string {
	fmt.Printf("hellot")
	fmt.Printf("hellot")
	fmt.Printf("hellot")
	fmt.Printf("hellot")
	fmt.Printf("hellot")
	fmt.Printf("hellot")
	return ""
}

type b struct {
	In  int
	Out string
}

func (f *b) Call(a int) string {
	if a == 3 {
		fmt.Printf("Hello there")
		fmt.Printf("Hello there")
		fmt.Printf("Hello there")
		fmt.Printf("Hello there")
	}
	fmt.Printf("%d", a)
	return ""
}
