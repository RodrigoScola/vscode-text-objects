import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`(struct_specifier) @object `,
			`(enum_specifier   ) @object `,
			`(union_specifier ) @object `,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			` (class_specifier body:(field_declaration_list (_) @class))`,
			`(struct_specifier body : (field_declaration_list (_)@object) ) `,
			`(declaration
		 declarator:(init_declarator
		 value:(initializer_list (_) @object))) `,
			`(type_definition type:(struct_specifier body:(field_declaration_list (_) @object ))) `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			`(class_declaration) @object `,
			`(enum_declaration) @object `,
			`(struct_declaration) @object `,
			`(record_declaration) @object `,
			`(anonymous_object_creation_expression) @object`,
			`(tuple_expression) @object`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			`(type_declaration (type_spec type: (struct_type))) @struct`,
			` (expression_list (composite_literal (_) ) ) @struct`,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			'(class_declaration) @class',
			` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression))) @object `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: ['(object) @object'].join('\n'),
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
		selector: ['(table) @object'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: ['(dictionary) @object'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [`(struct_item) @object`, `(struct_expression) @object`, `(enum_item) @object`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: ['(table) @object', `(inline_table) @object`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		selector: javascript().selector,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [
			` (block_mapping_pair value:(block_node (block_mapping (block_mapping_pair key:(_) value:(flow_node (_)))  )@object )) `,
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
