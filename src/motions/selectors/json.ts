import { Selector } from '../commands';
import { JsQuery } from './javascript';

//since the syntax is mostly the same, for now we can keep it the same
export const JsonSelector: Selector = {
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
	function() {
		return '';
	},
	array() {
		return JsQuery.array();
	},
	class() {
		return '';
	},
	innerClass() {
		return '';
	},
	conditional() {
		return '';
	},
	innerConditional() {
		return '';
	},
	innerFunction() {
		return '';
	},
	innerLoop() {
		return '';
	},
	innerString() {
		return JsQuery.innerString();
	},
	loop() {
		return '';
	},
	object() {
		return JsQuery.object();
	},
	parameters() {
		return '';
	},
	rhs() {
		return JsQuery.rhs();
	},
	string() {
		return JsQuery.string();
	},
	variables() {
		return '';
	},
};

