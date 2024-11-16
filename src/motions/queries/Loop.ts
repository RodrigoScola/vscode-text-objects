import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(for_statement) @loops`, `(while_statement) @loops`, `(do_statement) @loops`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (for_range_loop) @loop `, ` (for_statement) @loop `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			`(for_statement body: (block (_)+ @loop)) `,
			`(for_each_statement (block (_)+ @loop)) `,
			`(while_statement (block (_)+ @loop)) `,
			`(do_statement (block (_)+ @loop))`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (for_statement) @loop `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (for_statement body:(block (_) @loop)) `,
			` (enhanced_for_statement body:(block (_) @loop)) `,
			` (while_statement body:(block (_) @loop)) `,
			` (do_statement body:(block (_) @loop)) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [` (for_statement) @loop (for_in_statement) @loop `].join('\n'),
	};
}
function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
			`(while_statement) @loop`,
			`(repeat_statement) @loop`,
			`(for_numeric_statement) @loop`,
			`(for_generic_statement) @loop`,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (for_statement) @loop `, `(while_statement) @loop`, `(list_comprehension) @loop`].join(
			'\n'
		),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [`(loop_expression) @loop`, `(while_expression) @loop`, `(for_expression) @loop`].join('\n'),
	};
}
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	lua,
	python,
	rust,
	typescript,
	typescriptreact,
};
