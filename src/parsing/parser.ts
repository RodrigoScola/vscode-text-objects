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
	//need to add parser for this but for now lets do javascript
	typescript: {
		module: 'javascript',
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
			lang = await parser.Language.load(this.path(langname));
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

