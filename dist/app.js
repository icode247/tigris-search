"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const product_1 = require("./models/product");
const express_1 = __importDefault(require("express"));
const product_2 = require("./controllers/product");
class App {
    constructor(tigris) {
        this.tigris = tigris;
        this.app = (0, express_1.default)();
        this.PORT = 3000;
        this.dbName = 'products';
        this.setup();
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            yield this.init();
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //create a database
            this.db = yield this.tigris.createDatabaseIfNotExists(this.dbName);
            console.log('database created successfully');
            //register collections
            yield this.db.createOrUpdateCollection('blogs', product_1.productSchema);
            //initialize the controller
            new product_2.ProductController(this.db, this.app);
        });
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running at ${this.PORT}`);
        });
    }
}
exports.App = App;
