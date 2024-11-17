function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			`(init_declarator
                        declarator:(array_declarator)
                        value:(initializer_list (_) @array ) )`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: ['(initializer_list (_) @array ) '].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (initializer_expression (_) @array )  `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [
			` (composite_literal type: (array_type) body: (literal_value (_) @array)) `,
			` (composite_literal type: (slice_type) body: (literal_value (_) @array)) `,
			` (var_declaration (var_spec type : (array_type))) @array `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [`(array_initializer (_) @array )`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: ['(array (_) @array) '].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		query: javascript().query,
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [`(list (_) @array )`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(array_expression (_) @array ) `].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: ['(array (_) @array ) '].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		query: [` (block_sequence (_) @array ) `].join('\n'),
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
	json,
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
