import { Selector } from '../commands';

export const GoQuery: Selector = {
	type() {
		return '';
	},
	innerCall() {
		return '';
	},
	innerParameters() {
		return '';
	},
	call() {
		return '';
	},
	parameters() {
		return '';
	},
	function() {
		return [
			`(function_declaration
               name :(identifier)? @function.name
               body: (_)? @function.body
               ) @function`,
			`
                (func_literal
                body: (_) @function.body
                ) @function
                `,
		].join('\n');
	},
	array() {
		return '';
	},
	class() {
		return '';
	},
	conditional() {
		return '';
	},
	innerClass() {
		return '';
	},
	innerConditional() {
		return '';
	},
	innerFunction() {
		return [
			`
                (func_literal
                block (_) @function.body
                ) 
                `,
		].join('\n');
	},
	innerLoop() {
		return '';
	},
	innerString() {
		return '';
	},
	loop() {
		return '';
	},
	object() {
		return '';
	},
	rhs() {
		return '';
	},
	string() {
		return '';
	},
	variables() {
		return '';
	},
};

