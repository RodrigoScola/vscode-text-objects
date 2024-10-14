import assert from 'assert';
import path from 'path';
import {
	Language,
	default as Parser,
	default as parser,
} from 'web-tree-sitter';

export type Parsing = {
	module: string;
	language: Language;
	parser: Parser;
};

export const Languages = {
	javascript: {
		module: 'javascript',
	},
	javascriptreact: {
		module: 'javascript',
	},
	//need to add parser for this but for now lets do javascript
	typescript: {
		module: 'typescript',
	},

	typescriptreact: {
		module: 'typescript',
	},
	go: {
		module: 'go',
	},

	json: {
		module: 'json',
	},
	jsonc: {
		module: 'json',
	},
	python: {
		module: 'python',
	},
	cpp: {
		module: 'cpp',
	},
};

export type SupportedLanguages = keyof typeof Languages;

export class LanguageParser {
	private static initedLanguages: Partial<
		Record<keyof typeof Languages, Parsing>
	> = {};
	static async init() {
		const wasmPath = LanguageParser.path('tree-sitter');
		await parser.init({
			locateFile: () => wasmPath,
		});
	}
	static path(name: string) {
		return path.join(__dirname, '..', 'parsers', `${name}.wasm`); // Adjust the path if necessary
	}
	static async get(langname: string) {
		if (langname in LanguageParser.initedLanguages) {
			return LanguageParser.initedLanguages[
				langname as keyof typeof Languages
			];
		}

		let lang: Language | undefined;
		await LanguageParser.init();
		try {
			const parseName = Languages[langname as keyof typeof Languages];

			assert(parseName, 'could not find parser for ' + langname);
			const p = this.path(parseName.module);
			lang = await parser.Language.load(p);
		} catch (err) {
			console.error('could not set language', err);
			return undefined;
		}
		assert(lang, 'could not set language');
		const p = new Parser();
		p.setLanguage(lang);
		LanguageParser.initedLanguages[langname as keyof typeof Languages] = {
			language: lang,
			module: langname,
			parser: p,
		};
		return LanguageParser.initedLanguages[
			langname as keyof typeof Languages
		];
	}
}

