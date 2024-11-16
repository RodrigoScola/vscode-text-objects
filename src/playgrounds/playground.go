// this is a comment
// this is a comment
// this is a comment
// this is a comment
// this is a comment

package main

import (
	"fmt"
)

const h = 3

var (
	e       = 3
	fdg int = 3
)

var f int = 3

const fl int = 3

type St struct {
	A int
}

func main() {
	c := St{
		A: 4,
	}

	b, err := func() (int, error) {
		return 3, nil
	}()
	fmt.Errorf("err: %v", err)

	fd := retA(5)

	fn := retFunc(func() any {
		return 3
	})

	_ = b
	_ = fn
	_ = fd
	_ = c
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
	e = 4

	g := []int{1, 2, 3}
	g = []int{1, 2, 3}
	_ = g

	if a == 3 {
		fmt.Printf("Hello i")
		fmt.Printf("alskjdfklsjdf")
		fmt.Printf("Hello ii")
		fmt.Printf("Hello ")
	} else if a == 4 {

		fmt.Printf("Hello there")
		fmt.Printf("Hello there")
		//this is a cmment
	} else {

		//comment
	}

	fmt.Printf("%d", a)
	for i := range 10 {
		fmt.Println(i)
		fmt.Println(i)
		fmt.Println(i)
	}

	switch a {
	case 4:
		fmt.Println("he")
		break
	case 5:
		fmt.Println("he")
		break
	}

	asdf := retA(4)
	_ = asdf
	return ""
}

func retFunc(f func() any) func() any {
	return f
}

func retA(b int) int {
	return 3
}

func checkParam(s string, c []byte) {
}
