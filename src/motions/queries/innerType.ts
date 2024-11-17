function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			`(struct_specifier body: (field_declaration_list (_)+ @types ))`,
			`(union_specifier body:(field_declaration_list (_)+ @object) )`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	//todo: add the types
	return {
		language: 'cpp',
		query: [`(primitive_type) @type`].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [
			// ` (variable_declaration type: (_) @type) `,
			`(type_argumented_list) @type`,
		].join('\n'),
	};
}
function go(): QuerySelector {
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
function java(): QuerySelector {
	return {
		language: 'java',
		query: [`(interface_declaration body:(interface_body (_) @type))`].join('\n'),
	};
}

function rust(): QuerySelector {
	return {
		language: 'rust',
		query: ['(struct_item body: (field_declaration_list (_) @types ))'].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo addtypes
		query: [].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		query: [].join('\n'),
	};
}
function javascriptreact(): QuerySelector {
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
