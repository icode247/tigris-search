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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_1 = require("express");
const data_1 = require("../data");
class ProductController {
    constructor(db, app) {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = yield this.products.insertMany(data_1.products);
                res.status(201).json({
                    data: newBlog,
                    message: "Blog Created!",
                });
            }
            catch (e) {
                res.end();
                next(e);
            }
        });
        this.search = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const searchRequest = req.body;
            this.products.search(searchRequest, {
                onNext(result) {
                    res.status(200).json(result);
                },
                onError(error) {
                    res.end();
                    next(error);
                },
                onEnd() {
                    res.end();
                }
            });
        });
        this.products = db.getCollection("products");
        this.path = "/product";
        this.router = (0, express_1.Router)();
        this.db = db;
        this.setupRoutes(app);
    }
    setupRoutes(app) {
        this.router.post(`${this.path}/`, this.create);
        this.router.get(`${this.path}/`, this.search);
        app.use("/", this.router);
    }
}
exports.ProductController = ProductController;
