function C(): Selector {
	return {
		language: 'c',
		query: ['(string_content) @string', '(character) @string'].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (string_content) @string `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			` (string_literal) @string `,
			`(interpolated_string_expression) @string`,
			`(character_literal) @string`,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [`(raw_string_literal) @string`, `(interpreted_string_literal) @string`].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: ['(string_fragment) @string', `(multiline_string_fragment) @string`].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`(string (_)* @string) `, `(template_string (_)* @string) `].join('\n'),
	};
}
function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: [`(string_content) @string`].join('\n'),
	};
}
function json(): Selector {
	return {
		language: 'json',
		query: [`(string_content) @string`].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: ['(string) @string'].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (string_content) @string `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(string) @string`].join('\n'),
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
		query: [
			`(single_quote_scalar) @string`,
			` (block_mapping_pair value:(block_node (block_scalar) @string)) `,
			` (block_mapping_pair value:(flow_node (double_quote_scalar) @string )) `,
		].join('\n'),
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
