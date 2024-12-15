function C(): Selector {
	return {
		language: 'c',
		query: [`(for_statement) @loops`, `(while_statement) @loops`, `(do_statement) @loops`].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (for_range_loop) @loop `, ` (for_statement) @loop `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			`(for_statement body: (block (_)+ @loop)) `,
			`(for_each_statement (block (_)+ @loop)) `,
			`(while_statement (block (_)+ @loop)) `,
			`(do_statement (block (_)+ @loop))`,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [` (for_statement) @loop `].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (for_statement body:(block (_) @loop)) `,
			` (enhanced_for_statement body:(block (_) @loop)) `,
			` (while_statement body:(block (_) @loop)) `,
			` (do_statement body:(block (_) @loop)) `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [` (for_statement) @loop (for_in_statement) @loop `].join('\n'),
	};
}
function lua(): Selector {
	return {
		language: 'lua',
		query: [
			`(while_statement) @loop`,
			`(repeat_statement) @loop`,
			`(for_numeric_statement) @loop`,
			`(for_generic_statement) @loop`,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [
			` (for_in_clause) @loop `,
			` (for_statement) @loop `,
			`(while_statement) @loop`,
			`(list_comprehension) @loop`,
		].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(loop_expression) @loop`, `(while_expression) @loop`, `(for_expression) @loop`].join('\n'),
	};
}
function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
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
	javascriptreact,
};
