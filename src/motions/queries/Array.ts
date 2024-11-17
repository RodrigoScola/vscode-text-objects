function selectC(): Selector {
	return {
		language: 'c',
		query: [`(initializer_list) @array`].join('\n'),
	};
}

function selectCPP(): Selector {
	return {
		language: 'cpp',
		query: ['(initializer_list ) @array'].join('\n'),
	};
}
function selectCSharp(): Selector {
	return {
		language: 'csharp',
		query: [` (initializer_expression) @array `].join('\n'),
	};
}
function selectGo(): Selector {
	return {
		language: 'go',
		query: [
			` (composite_literal type: (array_type)) @array`,
			` (composite_literal type: (slice_type)) @array`,
			` (var_declaration (var_spec type : (array_type))) @array `,
			` (var_declaration (var_spec type : (slice_type))) @array `,
		].join('\n'),
	};
}
function selectJava(): Selector {
	return {
		language: 'java',
		query: ['(array_initializer) @array'].join('\n'),
	};
}

function selectJson(): Selector {
	return {
		language: 'json',
		query: ['(array) @array'].join('\n'),
	};
}

function selectJsonC(): Selector {
	return {
		language: 'jsonc',
		query: selectJson().query,
	};
}
function selectLua(): Selector {
	return {
		language: 'lua',
		query: [`(field_list) @array`, ,].join('\n'),
	};
}

function selectPython(): Selector {
	return {
		language: 'python',
		query: [' (list) @array', `(list_comprehension) @array`].join('\n'),
	};
}
function selectRust(): Selector {
	return {
		language: 'rust',
		query: [`(array_expression ) @array`].join('\n'),
	};
}

function selectToml(): Selector {
	return {
		language: 'toml',
		query: ['(array) @array'].join('\n'),
	};
}

function selectJavascript(): Selector {
	return {
		language: 'javascript',
		query: ['(array) @array'].join('\n'),
	};
}
function selectTypescript(): Selector {
	return {
		language: 'typescript',
		query: ['(array) @array'].join('\n'),
	};
}
function selectTypescriptReact(): Selector {
	return {
		language: 'typescriptreact',
		query: ['(array) @array'].join('\n'),
	};
}

function selectjavascriptReact(): Selector {
	return {
		language: 'javascriptreact',
		query: ['(array) @array'].join('\n'),
	};
}

function selectYaml(): Selector {
	return {
		language: 'yaml',
		query: [`  (block_sequence) @array  `].join('\n'),
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
