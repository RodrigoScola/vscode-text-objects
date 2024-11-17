function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			`(struct_specifier body: (field_declaration_list (_) @object) ) `,
			`(enum_specifier body: (enumerator_list (_) @object )) `,
			`
  (union_specifier body:(field_declaration_list (_)+ @object) )
        
        `,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [
			`(class_specifier) @object`,
			`(struct_specifier) @object`,
			`(declaration
 declarator:(init_declarator
 value:(initializer_list))) @object`,
			`(type_definition
type:(struct_specifier)
 ) @object`,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [
			`(class_declaration body:(declaration_list (_)@object)) `,
			`(enum_declaration body:(enum_member_declaration_list (_)@object))  `,
			`(struct_declaration body:(declaration_list (_) @object))  `,
			`(record_declaration parameters: (parameter_list (_)@parameter)) @object `,
			`(anonymous_object_creation_expression (_) @object) `,
			`(tuple_expression (_) @object ) `,
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
			'(class_declaration body: (class_body (_) @class) ) ',
			` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression) @object )) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: ['(object (_) @object ) '].join('\n'),
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
		query: [`(table (field_list (_) @object )) `].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(dictionary (_) @object) '].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [
			`(struct_item body: (field_declaration_list (_) @object)) `,
			`(struct_expression body: (field_initializer_list (_) @object)) `,
			`(enum_item body: (enum_variant_list (_) @object)) `,
		].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: ['(table (_) @object ) ', `(inline_table (_) @object) `].join('\n'),
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
		query: [
			` (block_mapping_pair value:(block_node (block_mapping (block_mapping_pair key:(_) value:(flow_node (_))) @object ))) `,
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
