function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			` (case_statement value:(_) (expression_statement (_)+ @conditional) (break_statement)* @conditional ) `,
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
		query: [
			` (case_statement value:(_) (expression_statement (_) @conditional) (break_statement) @conditional) `,
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
		query: [
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
		query: [
			`
(if_statement 
    consequence: (block (_) @consequence) 
)

`,
			`(if_statement consequence: (block (_)* @conditional) )`,
			`(if_statement alternative: (block (_)* @conditional))`,

			`(expression_switch_statement (expression_case  (_) @conditional ))`,
		].join('\n'),
	};
}

function java(): QuerySelector {
	return {
		language: 'java',
		query: [
			` (if_statement consequence:(block (_)+ @conditional )) `,
			` (if_statement consequence:(expression_statement (_)+ @conditional)) `,
			` (if_statement alternative:(expression_statement (_)+ @conditional)) `,
			` (if_statement alternative:(block (_)+ @conditional )) `,
			` (ternary_expression consequence:(_) @conditional) `,
			` (ternary_expression alternative:(_) @conditional) `,

			/**
			 * maybe todo? there is a bug where
			 * case value1:
			 * case value2:
			 * rest of the code
			 *
			 * can select the line of value1 if you are on the top
			 *
			 * and if you are on the bottom it selects
			 *
			 * value2:
			 * rest of the code
			 */
			`
  (switch_block_statement_group
 (switch_label)*
 (_)+ @conditional
 (break_statement)? @conditional) `,
		].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: [
			'(if_statement consequence: (_) @conditional )',
			'(if_statement consequence: (_) @conditional (comment) @comment )',
			'(if_statement alternative: (else_clause (_) @conditional (comment) @comment ))',
			'(if_statement alternative: (else_clause (_) @conditional  ))',
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [
			` (if_statement consequence: (_) @conditional)  `,
			` (elif_clause consequence:(block (_)+ @conditional)) `,
			` (else_clause body:(block (_)+ @conditional)) `,

			` (conditional_expression (_)+ @conditional ) `,
			//ternaries, kinda crazy
			` (conditional_expression (_) (comparison_operator (_) ) (_)+ @conditional) `,
		].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [
			`(if_expression consequence: (block (_)+ @conditional )) `,
			`(match_expression body: (match_block (_)+ @conditional )) `,
			`(let_declaration value: (if_expression consequence: (block (_)+ @conditional))) `,
			` (else_clause (block (_)+ @conditional )) `,
		].join('\n'),
	};
}

function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [
			` (if_statement consequence: (statement_block (_)+ @inner_statement)) `,
			` (else_clause (statement_block (_)+ @conditional)) `,
			` (if_statement consequence: (expression_statement (_)+ @inner_statement)) `,
			`  (else_clause (expression_statement (_)+ @inner_statement)) `,
			` (ternary_expression consequence:(_) @conditional ) `,
			` (ternary_expression alternative:(_) @conditional ) `,
			` (switch_case (comment)* @conditional )`,
			` (switch_case (comment)* @conditional body:(_)* @conditional ) `,
		].join('\n'),
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
