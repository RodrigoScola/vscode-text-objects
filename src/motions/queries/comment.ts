import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(comment)* @comment`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: ['(comment)+ @comment'].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(comment)+ @comment`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: ['(comment)+ @comment'].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [`(line_comment)+ @comment`, `(block_comment)+ @comment`].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: ['(comment)+ @comment'].join('\n'),
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
		selector: ['(comment)+ @comment'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (comment)+ @comment `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [` (line_comment)+ @comment `, ` (block_comment)+ @comment `].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: ['(comment)+ @comment'].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
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
};
