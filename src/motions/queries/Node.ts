import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(_ (compound_statement  ) ) @node  `].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			// `(_ (_ (compound_statement (expression_statement)? @expression ) @inner ) @node )  `,
			`(_ (_ (expression_statement) @expression ) @inner  ) @node `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(_ (block ) ) @node`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (_ (_ (_ (block) @inner ))) @outer `,
			`(_ (_ (_ (_ (block) @inner ))) @outer ) @outest `,

			// `(_ (block ) ) @node`,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`(_ (block (expression_statement) @inner ) @node (catch_clause)* @else) @outer`,
			`(_ (block (_)? @expression ) @inner  ) @node`,
			`(_ (_ (expression_statement) @expression ) @inner ) `,
			`(class_declaration) @node`,
			`(_ body: (_) )  @node`,

			` (class_declaration) @node `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
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

function python(): QuerySelector {
	return {
		language: 'python',
		selector: [`(_ (block)) @node `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
			`(struct_item) @class`,
			`(impl_item) @class`,
			`(trait_item) @class`,
			`(enum_item) @class`,
		].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		selector: javascript().selector,
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		selector: javascript().selector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		selector: javascript().selector,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [
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
