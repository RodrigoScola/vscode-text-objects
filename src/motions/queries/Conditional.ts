import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(if_statement) @conditional`, ` (conditional_expression) @conditional`].join('\n'),
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
			` (if_statement) @conditional `,
			` (switch_statement ) @conditional `,
			`(conditional_expression) @conditional`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (if_statement) @conditional `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`(if_statement) @conditional`,
			`(switch_expression) @conditional`,
			` (assignment_expression right:(ternary_expression)) @conditional `,
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
		//todo: this cannot be the only way to define a function
		selector: [` (if_statement)  @conditional `, ` (conditional_expression   ) @conditional`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [
			`(if_expression) @conditional`,
			`(match_expression) @conditional`,
			`(let_declaration value: (if_expression)) @conditional`,
		].join('\n'),
	};
}

const jsSelector = [
	`(if_statement) @if.statement `,
	`(switch_statement ) @conditional`,
	`(ternary_expression) @conditional`,
];
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: jsSelector.join('\n'),
	};
}

function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
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
};
