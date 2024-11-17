function C(): QuerySelector {
	return {
		language: 'c',
		query: ['(string_literal) @string', '(char_literal) @string'].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [`(string_literal) @string`, `(raw_string_literal) @string`].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [
			` (string_literal) @string `,
			`(interpolated_string_expression) @string`,
			`(character_literal) @string`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [`(raw_string_literal) @string`, `(interpreted_string_literal) @string`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [`(string_literal) @string`, `(character_literal) @string`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`( string ) @string`, `( template_string ) @string`].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		query: [`(string) @string`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: ['(string) @string'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [` (string) @string `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: [`(string) @string`].join('\n'),
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
		query: [
			`(single_quote_scalar) @string`,
			`(double_quote_scalar) @string`,
			`
			 (block_mapping_pair value:(block_node (block_scalar) @string))
			`,
		].join('\n'),
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
