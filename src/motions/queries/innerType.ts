function C(): Selector {
	return {
		language: 'c',
		query: [
			`(struct_specifier body: (field_declaration_list (_)+ @types ))`,
			`(union_specifier body:(field_declaration_list (_)+ @object) )`,
		].join('\n'),
	};
}

function cpp(): Selector {
	//todo: add the types
	return {
		language: 'cpp',
		query: [`(primitive_type) @type`].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			// ` (variable_declaration type: (_) @type) `,
			`(type_argumented_list) @type`,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			`(pointer_type (_) @types ) `,
			`(interface_type (_) @types)`,
			`(struct_type (field_declaration_list (_)+ @types))`,
			`(qualified_type (_) @types ) `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [`(interface_declaration body:(interface_body (_) @type))`].join('\n'),
	};
}

function rust(): Selector {
	return {
		language: 'rust',
		query: ['(struct_item body: (field_declaration_list (_) @types ))'].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		//todo addtypes
		query: [].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: [].join('\n'),
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: [].join('\n'),
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
	javascriptreact,
};
