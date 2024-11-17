function C(): Selector {
	return {
		language: 'c',
		query: [`(struct_specifier) @class`].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: ['(class_specifier) @class'].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [`(class_declaration) @class`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: ['(type_declaration (type_spec type: (struct_type) )) @struct '].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: ['(class_declaration) @class'].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			` ( class_declaration ) @class `,
			` (export_statement declaration: ( class_declaration ) @class ) @export `,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [' (class_definition) @class '].join('\n'),
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
	csharp,
	go,
	java,
	javascript,
	toml,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
