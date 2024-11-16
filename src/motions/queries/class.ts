import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(struct_specifier) @class`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: ['(class_specifier) @class'].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(class_declaration) @class`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: ['(type_declaration (type_spec type: (struct_type) )) @struct '].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: ['(class_declaration) @class'].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			` ( class_declaration ) @class `,
			` (export_statement declaration: ( class_declaration ) @class ) @export `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [' (class_definition) @class '].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [
			`(struct_item) @class`,
			`(impl_item) @class`,
			`(trait_item) @class`,
			`(enum_item) @class`,
		].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
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
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [
			` (block_mapping_pair key:(flow_node (plain_scalar)) value:(block_node (anchor)+ @class (_)+ @class   )) `,
		].join('\n'),
	};
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	toml,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
