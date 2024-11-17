function C(): Selector {
	return {
		language: 'c',
		query: [`(struct_specifier body: (field_declaration_list (_)+ @class ))`].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			`
  (class_specifier
 body:(field_declaration_list
  (access_specifier)
 (_)+ @class) )
			
			`,
		].join(`\n`),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (class_declaration body: (declaration_list (_)+ @body)) `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [` (struct_type (field_declaration_list (_)+ @struct) ) `].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: ['(class_declaration body: (class_body (_) @class))'].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`    (class_body (_)* @class.body) `].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [' (class_definition body: (_) @class )'].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			`(struct_item body: (field_declaration_list (_)+ @class )) `,
			`(impl_item body: (declaration_list (_)+ @class )) `,
			`(trait_item body: (declaration_list (_)+ @class)) `,
			`(enum_item body: (enum_variant_list (_)+ @class )) `,
		].join('\n'),
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
			` (block_mapping_pair key:(flow_node (plain_scalar)) value:(block_node (anchor) (_)+ @class   )) `,
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
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
