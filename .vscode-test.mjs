import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'dist/test/**/*.test.js',
	mocha: {
		timeout:5000
	},
});
