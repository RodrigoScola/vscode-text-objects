function C(): Selector {
	return {
		language: 'c',
		query: [
			` (switch_statement) @conditional `,
			` (conditional_expression  )@conditional `,
			` (if_statement) @conditional `,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			`(if_statement) @conditional`,

			` (switch_statement ) @conditional `,
			`(conditional_expression) @conditional`,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			` (conditional_expression  ) @conditional`,
			` (if_statement) @conditional `,
			` (switch_statement) @conditional `,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [` (if_statement  ) @conditional `, `(expression_switch_statement) @conditional`].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (if_statement) @conditional `,
			` (ternary_expression  ) @conditional`,
			` (ternary_expression ) @conditional`,
			` (switch_block_statement_group) @conditional `,
		].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: ['(if_statement) @conditional'].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (if_statement) @conditional  `, ` (conditional_expression) @conditional `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			`(if_expression) @conditional `,
			`(match_expression body: (match_block) @conditional) `,
			`(let_declaration value: (if_expression) @conditional) `,
		].join('\n'),
	};
}

const jsSelector = [
	` (if_statement) @conditional `,
	` (ternary_expression) @conditional `,
	` (switch_case) @conditional `,
];
function typescript(): Selector {
	return {
		language: 'typescript',
		query: jsSelector.join('\n'),
	};
}

function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: jsSelector.join('\n'),
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: jsSelector.join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: jsSelector.join('\n'),
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
