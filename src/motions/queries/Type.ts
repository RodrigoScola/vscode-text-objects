function C(): Selector {
	return {
		language: 'c',
		query: [
			`(declaration (type_qualifier) @types type: (primitive_type) @types ) `,
			`(declaration  type: (union_specifier) @types ) `,
			`(declaration (storage_class_specifier) @types type: (primitive_type) @types ) `,
			`(primitive_type) @types`,
			`(struct_specifier) @types`,

			`(union_specifier  ) @type`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			`(declaration (type_qualifier) @types type: (primitive_type) @types ) `,
			`(declaration  type: (union_specifier) @types ) `,
			`(declaration (storage_class_specifier) @types type: (primitive_type) @types ) `,
			`(primitive_type) @types`,
			`(struct_specifier) @types`,
			`(union_specifier  ) @type`,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (variable_declaration type: (_) @type) `, `(parameter type: (_) @type)`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			`(parameter_list (parameter_declaration)) @types`,
			`(type_declaration) @types`,
			`(pointer_type) @types `,
			`(type_identifier) @types`,
			`(interface_type) @types `,
			`(qualified_type  ) @types `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (interface_declaration) @types `,
			` (method_declaration type:(void_type) @types) `,
			`(type_identifier) @types`,
			`(void_type) @types`,
			`(array_type) @types`,
			`(integral_type) @types`,
			`(catch_type) @types`,
		].join('\n'),
	};
}

function rust(): Selector {
	return {
		language: 'rust',
		query: [`(type_identifier) @type`, `(primitive_type) @type`, `(struct_item) @class`].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: [
			` (export_statement (type_alias_declaration)) @type   `,
			` (type_alias_declaration) @type   `,
			` (export_statement (interface_declaration)) @type `,
			` (interface_declaration) @type `,
			`(type_annotation (_) @type)`,
		].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: [
			` (export_statement (type_alias_declaration)) @type   `,
			` (type_alias_declaration) @type   `,
			` (export_statement (interface_declaration)) @type `,
			` (interface_declaration) @type `,
			`(type_annotation (_) @type)`,
		].join('\n'),
	};
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	rust,
	typescript,
	typescriptreact,
};
