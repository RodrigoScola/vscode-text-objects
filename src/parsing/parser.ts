import assert from 'assert';
import path from 'path';
import { Language, default as Parser, default as parser } from 'web-tree-sitter';

export const Languages = {
	'tree-sitter': {
		module: 'tree-sitter',
	},
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
		module: 'tsx',
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

	csharp: {
		module: 'c_sharp',
	},
	rust: {
		module: 'rust',
	},
	c: {
		module: 'c',
	},
	css: {
		module: 'css',
	},
	yaml: {
		module: 'yaml',
	},
	lua: {
		module: 'lua',
	},
	java: {
		module: 'java',
	},
	toml: {
		module: 'toml',
	},
};

export const SupportedLanguages = Object.keys(Languages);

export class LanguageParser {
	private static hasStarted: boolean = false;
	private static initedLanguages: Partial<Record<keyof typeof Languages, Parsing>> = {};
	static init(): Promise<void> {
		if (LanguageParser.hasStarted) {
			return Promise.resolve();
		}
		const wasmPath = LanguageParser.path('tree-sitter');
		LanguageParser.hasStarted = true;

		return parser.init({
			locateFile: () => wasmPath,
		});
	}
	static path(name: string): string {
		return path.join(__dirname, '..', 'parsers', `tree-sitter-${name}.wasm`); // Adjust the path if necessary
	}
	static async get(langname: string): Promise<Parsing | undefined> {
		if (langname in LanguageParser.initedLanguages) {
			return LanguageParser.initedLanguages[langname as keyof typeof Languages];
		}

		let lang: Language | undefined;
		assert(LanguageParser.hasStarted === true, 'the default language parser has not started');
		// if (!LanguageParser.hasStarted) {
		// 	await LanguageParser.init()
		// }

		const parseName = Languages[langname as keyof typeof Languages];

		assert(parseName, 'could not find parser for ' + langname);
		const modulePath = this.path(parseName.module);

		if (!(langname in LanguageParser.initedLanguages)) {
			try {
				lang = await parser.Language.load(modulePath);
			} catch (err) {
				// could send an notification alert
				console.error('could not set language:', err);
			}
		} else {
			//@ts-ignore
			lang = LanguageParser.initedLanguages[langname];
		}
		assert(lang, `could not set language ${langname}`);
		const p = new Parser();
		p.setLanguage(lang);
		LanguageParser.initedLanguages[langname as keyof typeof Languages] = {
			language: lang,
			module: langname,
			parser: p,
		};
		return LanguageParser.initedLanguages[langname as keyof typeof Languages];
	}
}
