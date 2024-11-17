function java(): QuerySelector {
	return {
		language: 'java',
		query: [` (block (_) @node) `, `(expression_statement) @node`].join('\n'),
	};
}

export default {
	java,
};
