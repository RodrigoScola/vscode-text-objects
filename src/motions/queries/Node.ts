function C(): Selector {
	return {
		language: 'c',
		query: [`(_ (compound_statement  ) ) @node  `].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			// `(_ (_ (compound_statement (expression_statement)? @expression ) @inner ) @node )  `,
			`(_ (_ (expression_statement) @expression ) @inner  ) @node `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [`(_ (block ) ) @node`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (_ (_ (_ (block) @inner ))) @outer `,
			`(_ (_ (_ (_ (block) @inner ))) @outer ) @outest `,

			// `(_ (block ) ) @node`,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			`(_ (block (expression_statement) @inner ) @node (catch_clause)* @else) @outer`,
			`(_ (block (_)? @expression ) @inner  ) @node`,
			`(_ (_ (expression_statement) @expression ) @inner ) `,
			`(class_declaration) @node`,
			`(_ body: (_) )  @node`,

			` (class_declaration) @node `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			//weirdly the (_) @other  needs to have 2 queries, one with asterisk
			// and another without
			`(_ (statement_block) @inner (_)* @other ) @node`,
			`(_ (statement_block) @inner (_) @other ) @node`,
			`(export_statement (_ (_ (_ (statement_block) @inner ) @node ))) @export `,
			`(export_statement (_ (statement_block) @inner ) @node ) @export `,
			`(export_statement) @export`,
			`(class_declaration) @node`,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [`(_ (block)) @node `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(struct_item) @class`, `(impl_item) @class`, `(trait_item) @class`, `(enum_item) @class`].join(
			'\n'
		),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_) @rhs)`].join('\n'),
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
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [
			` (block_mapping_pair key:(flow_node (plain_scalar)) value:(block_node (anchor)+ @class (_)+ @class   )) `,
		].join('\n'),
	};
}

export default {
	C,
	cpp,
	java,
	csharp,
	go,
	javascript,
	python,
};
