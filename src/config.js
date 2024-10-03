"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const assert_1 = __importDefault(require("assert"));
class Config {
    config;
    constructor(configuration) {
        this.config = configuration;
    }
    value(configKey) {
        if (configKey.workspaceValue) {
            return configKey.workspaceValue;
        }
        else if (configKey.globalValue) {
            return configKey.globalValue;
        }
        return configKey.defaultValue;
    }
    lookBack() {
        const inspection = this.config.inspect('lookBack');
        (0, assert_1.default)(inspection && typeof inspection.defaultValue === 'boolean', 'lookBack configuration is a boolean');
        const configValue = this.value(inspection);
        (0, assert_1.default)(typeof configValue === 'boolean');
        return configValue;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map