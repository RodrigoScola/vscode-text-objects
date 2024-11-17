import { QuerySelector } from '../commands';

function java(): QuerySelector {
	return {
		language: 'java',
		selector: [` (block (_) @node) `, `(expression_statement) @node`].join('\n'),
	};
}

export default {
	java,
};
