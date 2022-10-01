import {Tigris} from "@tigrisdata/core";
import {Config} from "./lib/config";
import {App} from "./app";


const tigris: Tigris = new Config().initializeTigrisClient();
const app: App = new Application(tigris);
app.start();
