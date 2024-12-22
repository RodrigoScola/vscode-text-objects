function C(): Selector {
	return {
		language: 'c',
		query: [
			`(init_declarator
                        declarator:(array_declarator)
                        value:(initializer_list (_) @array ) )`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: ['(initializer_list (_) @array ) '].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (initializer_expression (_) @array )  `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (composite_literal type: (array_type) body: (literal_value (_) @array)) `,
			` (composite_literal type: (slice_type) body: (literal_value (_) @array)) `,
			` (var_declaration (var_spec type : (array_type))) @array `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [`(array_initializer (_) @array )`].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: ['(array (_) @array) '].join('\n'),
	};
}

function json(): Selector {
	return {
		language: 'json',
		query: javascript().query,
	};
}
function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: javascript().query,
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [`(list (_) @array )`].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(array_expression (_) @array ) `].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: ['(array (_) @array ) '].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [` (block_sequence (_) @array ) `].join('\n'),
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
	json,
	jsonc,
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
