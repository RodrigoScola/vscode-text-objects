package main

import "fmt"

var eight int

//com
//com
//com
//com
//comjaslkdfjalksdfasdfasdfasdf

func fueigh(b int, other string) (int, error) {
	return b, nil
}

type P interface {
	Clear()
	Clear2()
}

type St struct {
	Number int
	String string
}

func e() error {
	return nil
}

func main() {

	var barr [5]int

	arr := [4]int{1, 2, 3}

	vd := St{
		Number: 3,
	}

	fmt.Println(vd.Number)

	str := "this is a string"

	for i := 0; i < 100; i++ {
		fmt.Println(i)
	}

	m := make([]int, 0)

	for i, v := range m {
		fmt.Println(i, v)
	}

	var one, two, thrww = 1, 2, 3

	fmt.Println(one, two, thrww)
	otherstr := `this is another way?`

	fmt.Println(otherstr)
	fmt.Println(str)
	var b int = 3
	v := 4
	fmt.Println(v, b)

	f, err := fueigh()

	if err != nil {
		panic(err)
	}

	if err = e(); err != nil {
		panic(err)
	}

	println(f)

}
