function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			`(struct_specifier) @object `,
			`(enum_specifier   ) @object `,
			`(union_specifier ) @object `,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
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
function csharp(): QuerySelector {
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
function go(): QuerySelector {
	return {
		language: 'go',
		query: [
			`(type_declaration (type_spec type: (struct_type))) @struct`,
			` (expression_list (composite_literal (_) ) ) @struct`,
		].join('\n'),
	};
}
function java(): QuerySelector {
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
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: ['(object) @object'].join('\n'),
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
		query: ['(table) @object'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(dictionary) @object'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(struct_item) @object`, `(struct_expression) @object`, `(enum_item) @object`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: ['(table) @object', `(inline_table) @object`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		query: [
			` (block_mapping_pair value:(block_node (block_mapping (block_mapping_pair key:(_) value:(flow_node (_)))  )@object )) `,
		].join('\n'),
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
