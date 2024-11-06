package main

import (
	"fmt"
	"strings"
)

func main() {

	// this is one comment
	// that is another comment

	/** maybe */

	var sb strings.Builder

	_ = sb

	d := b{}

	d.Call(9)

	anon := func() {

	}

	go (func() {
	})()

	var b = func() {
	}

	_ = b

	_ = anon
}

func callOther() string {
	return ""
}

type b struct {
}

func (f *b) Call(a int) string {
	fmt.Printf("%d", a)
	return ""
}
