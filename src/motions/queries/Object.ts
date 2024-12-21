function C(): Selector {
	return {
		language: 'c',
		query: [
			` (type_definition type:(struct_specifier) @object ) @outer `,
			`(struct_specifier) @object `,
			`(enum_specifier   ) @object `,
			`(union_specifier ) @object `,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (class_specifier body:(field_declaration_list (_) @class))`,
			`(struct_specifier body : (field_declaration_list (_)@object) ) `,
			`(declaration
		 declarator:(init_declarator
		 value:(initializer_list (_) @object))) `,
			`(type_definition type:(struct_specifier body:(field_declaration_list (_) @object ))) `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			`(class_declaration) @object `,
			`(enum_declaration) @object `,
			`(struct_declaration) @object `,
			`(record_declaration) @object `,
			`(anonymous_object_creation_expression) @object`,
			`(tuple_expression) @object`,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			`(type_declaration (type_spec type: (struct_type))) @struct`,
			` (expression_list (composite_literal (_) ) ) @struct`,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			'(class_declaration) @class',
			` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression))) @object `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: ['(object) @object'].join('\n'),
	};
}

function json(): Selector {
	return {
		language: 'json',
		query: javascript().query,
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
		query: ['(table) @object'].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['(dictionary) @object'].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(struct_item) @object`, `(struct_expression) @object`, `(enum_item) @object`].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: ['(table) @object', `(inline_table) @object`].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [
			` (block_mapping_pair value:(block_node (block_mapping (block_mapping_pair key:(_) value:(flow_node (_)))  )@object )) `,
		].join('\n'),
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
export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
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
