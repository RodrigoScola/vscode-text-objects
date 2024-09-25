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

const languages = {
     javascript: {
          module: 'javascript',
     },
};

export class LanguageParser {
     private static initedLanguages: Partial<
          Record<keyof typeof languages, Parsing>
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
     static async get(langname: keyof typeof languages) {
          if (langname in LanguageParser.initedLanguages) {
               return LanguageParser.initedLanguages[langname];
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
          LanguageParser.initedLanguages[langname] = {
               language: lang,
               module: langname,
               parser: p,
          };
          return LanguageParser.initedLanguages[langname];
     }
}

