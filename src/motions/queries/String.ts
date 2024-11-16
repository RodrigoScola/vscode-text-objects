import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: ['(string_literal) @string', '(char_literal) @string'].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [`(string_literal) @string`, `(raw_string_literal) @string`].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			` (string_literal) @string `,
			`(interpolated_string_expression) @string`,
			`(character_literal) @string`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [`(raw_string_literal) @string`, `(interpreted_string_literal) @string`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [`(string_literal) @string`, `(character_literal) @string`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`( string ) @string`, `( template_string ) @string`].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: [`(string) @string`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(string) @string'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (string) @string `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(string) @string`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [
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
		selector: javascript().selector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		selector: javascript().selector,
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
