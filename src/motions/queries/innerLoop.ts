function C(): Selector {
	return {
		language: 'c',
		query: [
			`(for_statement body: (compound_statement (_)+ @loops)) `,
			`(while_statement body: (compound_statement (_)+ @loops)) `,
			`(do_statement body: (compound_statement (_)+ @loops)) `,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (for_range_loop body: (compound_statement (_)+ @loop) ) `,
			` (for_statement body: (compound_statement (_)+ @loop)) `,
		].join('\n'),
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
		query: [`(for_statement body: (block (_) @loop)*) `].join('\n'),
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
		query: [
			`     
     (for_statement
     body: (statement_block
     (_)* @loop_body))

     (for_in_statement
     body: (statement_block
     (_)* @loop_body))
     `,
		].join('\n'),
	};
}
function lua(): Selector {
	return {
		language: 'lua',
		query: [
			`(while_statement body: (block (_)+ @loop )) `,
			`(repeat_statement body: (block (_)+ @loop )) `,
			`(for_numeric_statement body: (block (_)+ @loop )) `,
			`(for_generic_statement body: (block (_)+ @loop )) `,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [
			`(list_comprehension body: (_)+ @loop )`,
			`(for_in_clause right:(_) @loop )`,
			`(for_statement body: (block (_)+ @loop)) `,
		].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [` (for_expression body: (block (_)+ @loop)) `].join('\n'),
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
