function C(): Selector {
	return {
		language: 'c',
		query: [`(comment)* @comment`].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: ['(comment)+ @comment'].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [`(comment)+ @comment`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: ['(comment)+ @comment'].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [`(line_comment)+ @comment`, `(block_comment)+ @comment`].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: ['(comment)+ @comment'].join('\n'),
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
		query: ['(comment)+ @comment'].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (comment)+ @comment `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [` (line_comment)+ @comment `, ` (block_comment)+ @comment `].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: ['(comment)+ @comment'].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
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
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [`(comment)+ @comment`].join('\n'),
	};
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
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
