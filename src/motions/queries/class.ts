function C(): QuerySelector {
	return {
		language: 'c',
		query: [`(struct_specifier) @class`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: ['(class_specifier) @class'].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [`(class_declaration) @class`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: ['(type_declaration (type_spec type: (struct_type) )) @struct '].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: ['(class_declaration) @class'].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [
			` ( class_declaration ) @class `,
			` (export_statement declaration: ( class_declaration ) @class ) @export `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [' (class_definition) @class '].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(struct_item) @class`, `(impl_item) @class`, `(trait_item) @class`, `(enum_item) @class`].join(
			'\n'
		),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_) @rhs)`].join('\n'),
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
function yaml(): QuerySelector {
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
