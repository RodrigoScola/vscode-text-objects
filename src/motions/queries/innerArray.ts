import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`(init_declarator
                        declarator:(array_declarator)
                        value:(initializer_list (_) @array ) )`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: ['(initializer_list (_) @array ) '].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (initializer_expression (_) @array )  `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (composite_literal type: (array_type) body: (literal_value (_) @array)) `,
			` (composite_literal type: (slice_type) body: (literal_value (_) @array)) `,
			` (var_declaration (var_spec type : (array_type))) @array `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [`(array_initializer (_) @array )`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: ['(array (_) @array) '].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: javascript().selector,
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [`(list (_) @array )`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [`(array_expression (_) @array ) `].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: ['(array (_) @array ) '].join('\n'),
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
		//todo revise the selectors
		selector: [` (block_sequence (_) @array ) `].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		//todo revise the selectors
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
