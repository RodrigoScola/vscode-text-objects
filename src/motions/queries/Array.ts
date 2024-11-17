import { QuerySelector } from '../commands';

function selectC(): QuerySelector {
	return {
		language: 'c',
		selector: [`(initializer_list) @array`].join('\n'),
	};
}

function selectCPP(): QuerySelector {
	return {
		language: 'cpp',
		selector: ['(initializer_list ) @array'].join('\n'),
	};
}
function selectCSharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (initializer_expression) @array `].join('\n'),
	};
}
function selectGo(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (composite_literal type: (array_type)) @array`,
			` (composite_literal type: (slice_type)) @array`,
			` (var_declaration (var_spec type : (array_type))) @array `,
			` (var_declaration (var_spec type : (slice_type))) @array `,
		].join('\n'),
	};
}
function selectJava(): QuerySelector {
	return {
		language: 'java',
		selector: ['(array_initializer) @array'].join('\n'),
	};
}

function selectJson(): QuerySelector {
	return {
		language: 'json',
		selector: ['(array) @array'].join('\n'),
	};
}

function selectJsonC(): QuerySelector {
	return {
		language: 'jsonc',
		selector: selectJson().selector,
	};
}
function selectLua(): QuerySelector {
	return {
		language: 'lua',
		selector: [`(field_list) @array`, ,].join('\n'),
	};
}

function selectPython(): QuerySelector {
	return {
		language: 'python',
		selector: [' (list) @array', `(list_comprehension) @array`].join('\n'),
	};
}
function selectRust(): QuerySelector {
	return {
		language: 'rust',
		selector: [`(array_expression ) @array`].join('\n'),
	};
}

function selectToml(): QuerySelector {
	return {
		language: 'toml',
		selector: ['(array) @array'].join('\n'),
	};
}

function selectJavascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: ['(array) @array'].join('\n'),
	};
}
function selectTypescript(): QuerySelector {
	return {
		language: 'typescript',
		selector: ['(array) @array'].join('\n'),
	};
}
function selectTypescriptReact(): QuerySelector {
	return {
		language: 'typescriptreact',
		selector: ['(array) @array'].join('\n'),
	};
}

function selectjavascriptReact(): QuerySelector {
	return {
		language: 'javascriptreact',
		selector: ['(array) @array'].join('\n'),
	};
}

function selectYaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [`  (block_sequence) @array  `].join('\n'),
	};
}

export const select = {
	C: selectC,
	cpp: selectCPP,
	csharp: selectCSharp,
	go: selectGo,
	java: selectJava,
	yaml: selectYaml,
	javascript: selectJavascript,
	json: selectJson,
	jsonc: selectJsonC,
	toml: selectToml,
	lua: selectLua,
	python: selectPython,
	rust: selectRust,
	typescript: selectTypescript,
	typescriptreact: selectTypescriptReact,
	javascriptreact: selectjavascriptReact,
};

export const goTo = select;
