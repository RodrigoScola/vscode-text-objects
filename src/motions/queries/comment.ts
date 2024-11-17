function C(): QuerySelector {
	return {
		language: 'c',
		query: [`(comment)* @comment`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: ['(comment)+ @comment'].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [`(comment)+ @comment`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: ['(comment)+ @comment'].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [`(line_comment)+ @comment`, `(block_comment)+ @comment`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: ['(comment)+ @comment'].join('\n'),
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
		query: ['(comment)+ @comment'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [` (comment)+ @comment `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [` (line_comment)+ @comment `, ` (block_comment)+ @comment `].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: ['(comment)+ @comment'].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
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
function yaml(): QuerySelector {
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
