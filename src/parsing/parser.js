"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageParser = exports.Languages = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = __importDefault(require("path"));
const web_tree_sitter_1 = __importDefault(require("web-tree-sitter"));
exports.Languages = {
    javascript: {
        module: 'javascript',
    },
    javascriptreact: {
        module: 'javascript',
    },
    //need to add parser for this but for now lets do javascript
    typescript: {
        module: 'javascript',
    },
    typescriptreact: {
        module: 'javascript',
    },
};
class LanguageParser {
    static initedLanguages = {};
    static async init() {
        const wasmPath = LanguageParser.path('tree-sitter');
        await web_tree_sitter_1.default.init({
            locateFile: () => wasmPath,
        });
    }
    static path(name) {
        return path_1.default.join(__dirname, '..', 'parsers', `${name}.wasm`); // Adjust the path if necessary
    }
    static async get(langname) {
        if (langname in LanguageParser.initedLanguages) {
            return LanguageParser.initedLanguages[langname];
        }
        let lang;
        await LanguageParser.init();
        try {
            const parseName = exports.Languages[langname];
            (0, assert_1.default)(parseName, 'could not find parser for ' + langname);
            lang = await web_tree_sitter_1.default.Language.load(this.path(parseName.module));
        }
        catch (err) {
            console.error('could not set language', err);
            return undefined;
        }
        (0, assert_1.default)(lang, 'could not set language');
        const p = new web_tree_sitter_1.default();
        p.setLanguage(lang);
        LanguageParser.initedLanguages[langname] = {
            language: lang,
            module: langname,
            parser: p,
        };
        return LanguageParser.initedLanguages[langname];
    }
}
exports.LanguageParser = LanguageParser;
//# sourceMappingURL=parser.js.map