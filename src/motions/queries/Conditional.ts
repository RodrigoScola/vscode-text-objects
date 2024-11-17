function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			` (switch_statement) @conditional `,
			` (conditional_expression  )@conditional `,
			` (if_statement) @conditional `,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			`(if_statement) @conditional`,

			` (switch_statement ) @conditional `,
			`(conditional_expression) @conditional`,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			` (conditional_expression  ) @conditional`,
			` (if_statement) @conditional `,
			` (switch_statement) @conditional `,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (if_statement  ) @conditional `, `(expression_switch_statement) @conditional`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (if_statement) @conditional `,
			` (ternary_expression  ) @conditional`,
			` (ternary_expression ) @conditional`,
			` (switch_block_statement_group) @conditional `,
		].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(if_statement) @conditional'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: [` (if_statement) @conditional  `, ` (conditional_expression) @conditional `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
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
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		selector: jsSelector.join('\n'),
	};
}

function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		selector: jsSelector.join('\n'),
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		selector: jsSelector.join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: jsSelector.join('\n'),
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
