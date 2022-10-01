"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const core_1 = require("@tigrisdata/core");
class Config {
    initializeTigrisClient() {
        return new core_1.Tigris({
            serverUrl: "localhost:8081",
            insecureChannel: true,
        });
    }
}
exports.Config = Config;
