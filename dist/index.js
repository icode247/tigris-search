"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./lib/config");
const app_1 = require("./app");
const tigris = new config_1.Config().initializeTigrisClient();
const app = new app_1.App(tigris);
app.start();
