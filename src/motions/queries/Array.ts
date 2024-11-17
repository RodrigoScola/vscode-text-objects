function selectC(): QuerySelector {
	return {
		language: 'c',
		query: [`(initializer_list) @array`].join('\n'),
	};
}

function selectCPP(): QuerySelector {
	return {
		language: 'cpp',
		query: ['(initializer_list ) @array'].join('\n'),
	};
}
function selectCSharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (initializer_expression) @array `].join('\n'),
	};
}
function selectGo(): QuerySelector {
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
function selectJava(): QuerySelector {
	return {
		language: 'java',
		query: ['(array_initializer) @array'].join('\n'),
	};
}

function selectJson(): QuerySelector {
	return {
		language: 'json',
		query: ['(array) @array'].join('\n'),
	};
}

function selectJsonC(): QuerySelector {
	return {
		language: 'jsonc',
		query: selectJson().query,
	};
}
function selectLua(): QuerySelector {
	return {
		language: 'lua',
		query: [`(field_list) @array`, ,].join('\n'),
	};
}

function selectPython(): QuerySelector {
	return {
		language: 'python',
		query: [' (list) @array', `(list_comprehension) @array`].join('\n'),
	};
}
function selectRust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(array_expression ) @array`].join('\n'),
	};
}

function selectToml(): QuerySelector {
	return {
		language: 'toml',
		query: ['(array) @array'].join('\n'),
	};
}

function selectJavascript(): QuerySelector {
	return {
		language: 'javascript',
		query: ['(array) @array'].join('\n'),
	};
}
function selectTypescript(): QuerySelector {
	return {
		language: 'typescript',
		query: ['(array) @array'].join('\n'),
	};
}
function selectTypescriptReact(): QuerySelector {
	return {
		language: 'typescriptreact',
		query: ['(array) @array'].join('\n'),
	};
}

function selectjavascriptReact(): QuerySelector {
	return {
		language: 'javascriptreact',
		query: ['(array) @array'].join('\n'),
	};
}

function selectYaml(): QuerySelector {
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
