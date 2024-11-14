import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			` (conditional_expression consequence:(_)+ @conditional) `,
			` (conditional_expression alternative:(_)+ @conditional ) `,

			` (if_statement consequence:(compound_statement
  (_)+ @conditional))
			
			`,
			`(else_clause (compound_statement (_)+ @conditional))`,
			`(else_clause (expression_statement (_)+ @conditional))`,

			` (if_statement consequence:(expression_statement (_)+ @conditional )) `,

			,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			` (conditional_expression consequence:(_)+ @conditional) `,
			` (conditional_expression alternative:(_)+ @conditional ) `,
			` (if_statement consequence:(compound_statement
  (_)+ @conditional)) `,
			`(else_clause (compound_statement (_)+ @conditional))`,
			` (if_statement consequence:(expression_statement (_)+ @conditional )) `,
			,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			` (conditional_expression consequence:(_)+ @conditional) `,
			` (conditional_expression alternative:(_)+ @conditional ) `,

			` (if_statement consequence:(block
  (_)+ @conditional)) `,
			` (switch_statement body: (switch_body (_) @conditional)) `,
			`(if_statement alternative: (block (_)+ @conditional))`,

			` (if_statement consequence:(expression_statement (_)+ @conditional )) `,

			,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			`
(if_statement 
    consequence: (block (_) @consequence) 
)

`,
			`(if_statement consequence: (block (_)* @conditional) )`,
			`(if_statement alternative: (block (_)* @conditional))`,

			//todo: this grabs the condition aswell
			`(expression_switch_statement (expression_case  (_) @conditional ))`,
		].join('\n'),
	};
}

function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`( (if_statement consequence: (_) @conditional))
			
			`,
			// `(if_statement consequence: (block (_)+ @conditional )) `,
			`(switch_expression body: (switch_block (_)+ @conditional )) `,
			` (ternary_expression consequence: (_) @conditional )`,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [` (if_statement consequence: (statement_block (_)+ @inner_statement)) `].join('\n'),
	};
}
function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
			'(if_statement consequence: (_) @conditional )',
			'(if_statement consequence: (_) @conditional (comment) @comment )',
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (if_statement consequence: (_) @conditional)  `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
			`(if_expression consequence: (block (_)+ @conditional )) `,
			`(match_expression body: (match_block (_)+ @conditional )) `,
			`(let_declaration value: (if_expression consequence: (block (_)+ @conditional))) `,
			//todo do the else ones
		].join('\n'),
	};
}
function typescript(): QuerySelector {
	return {
		language: 'typescript',
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
};
