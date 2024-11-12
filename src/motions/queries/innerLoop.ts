import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`(for_statement body: (compound_statement (_)+ @loops)) `,
			`(while_statement body: (compound_statement (_)+ @loops)) `,
			`(do_statement body: (compound_statement (_)+ @loops)) `,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			` (for_range_loop body: (compound_statement (_)+ @loop) ) `,
			` (for_statement body: (compound_statement (_)+ @loop)) `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			`(for_statement body: (block (_)+ @loop)) `,
			`(for_each_statement (block (_)+ @loop)) `,
			`(while_statement (block (_)+ @loop)) `,
			`(do_statement (block (_)+ @loop))`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [`(for_statement body: (block (_) @loop)*) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (for_statement body:(block (_) @loop)) `,
			` (enhanced_for_statement body:(block (_) @loop)) `,
			` (while_statement body:(block (_) @loop)) `,
			` (do_statement body:(block (_) @loop)) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			`     
     (for_statement
     body: (statement_block
     (_)* @loop_body))

     (for_in_statement
     body: (statement_block
     (_)* @loop_body))
     `,
		].join('\n'),
	};
}
function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
			`(while_statement body: (block (_)+ @loop )) `,
			`(repeat_statement body: (block (_)+ @loop )) `,
			`(for_numeric_statement body: (block (_)+ @loop )) `,
			`(for_generic_statement body: (block (_)+ @loop )) `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (for_statement body: (block (_)+ @loop)) `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [` (for_statement body: (block (_)+ @loop)) `].join('\n'),
	};
}
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
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
	lua,
	python,
	rust,
	typescript,
};
