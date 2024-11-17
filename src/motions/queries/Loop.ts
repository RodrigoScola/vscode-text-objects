function C(): QuerySelector {
	return {
		language: 'c',
		query: [`(for_statement) @loops`, `(while_statement) @loops`, `(do_statement) @loops`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (for_range_loop) @loop `, ` (for_statement) @loop `].join('\n'),
	};
}
function csharp(): QuerySelector {
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
function go(): QuerySelector {
	return {
		language: 'go',
		query: [` (for_statement) @loop `].join('\n'),
	};
}
function java(): QuerySelector {
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
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [` (for_statement) @loop (for_in_statement) @loop `].join('\n'),
	};
}
function lua(): QuerySelector {
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

function python(): QuerySelector {
	return {
		language: 'python',
		query: [` (for_statement) @loop `, `(while_statement) @loop`, `(list_comprehension) @loop`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(loop_expression) @loop`, `(while_expression) @loop`, `(for_expression) @loop`].join('\n'),
	};
}
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
	};
}
function javascriptreact(): QuerySelector {
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
