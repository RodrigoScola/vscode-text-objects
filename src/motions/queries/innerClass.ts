import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(struct_specifier body: (field_declaration_list (_)+ @class ))`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			`
  (class_specifier
 body:(field_declaration_list
  (access_specifier)
 (_)+ @class) )
			
			`,
		].join(`\n`),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (class_declaration body: (declaration_list (_)+ @body)) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (struct_type (field_declaration_list (_)+ @struct) ) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: ['(class_declaration body: (class_body (_) @class))'].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`    (class_body (_)* @class.body) `].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: [' (class_definition body: (_) @class )'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
			`(struct_item body: (field_declaration_list (_)+ @class )) `,
			`(impl_item body: (declaration_list (_)+ @class )) `,
			`(trait_item body: (declaration_list (_)+ @class)) `,
			`(enum_item body: (enum_variant_list (_)+ @class )) `,
		].join('\n'),
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
			` (block_mapping_pair key:(flow_node (plain_scalar)) value:(block_node (anchor) (_)+ @class   )) `,
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
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
