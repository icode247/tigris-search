import express, { Request, Response, NextFunction, Router } from "express";
import { Collection, DB } from "@tigrisdata/core";
import { Product } from "../models/product";
import { SearchRequest, SearchResult } from "@tigrisdata/core/dist/search/types";
import { products } from '../data'
interface Controller {
    setupRoutes(app: express.Application);
}


export class ProductController implements Controller {
    private readonly db: DB;
    private readonly blogs: Collection<Product>;
    private readonly router: Router;
    private readonly path: string;
    private products

    constructor(db: DB, app: express.Application) {
        this.products = db.getCollection<Product>("blogs");
        this.path = "/product";
        this.router = Router();
        this.db = db;
        this.setupRoutes(app);
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {

            await this.products.insert([{
                id: 1,
                name: "Apple Watch",
                price: 2000,
                status: "available",
                quantity: 10

            },
                {
                    id: 2,
                    name: "Iphone 13 Mini",
                    price: 3000,
                    status: "available",
                    quantity: 4

                },
                {
                    id: 3,
                    name: "Google Home",
                    price: 2080,
                    status: "available",
                    quantity: 12

                },
                {
                    id: 4,
                    name: "Mac Book Pro",
                    price: 25000,
                    status: "available",
                    quantity: 50

                },
                {
                    id: 5,
                    name: "Smartbox Router",
                    price: 9000,
                    status: "available",
                    quantity: 30,

                }]);

            res.status(201).json({
                message: "Blog Created!",
            });
        } catch (e) {
            res.end()
            next(e)
        }
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const searchRequest: SearchRequest<Product> = req.body;
        this.products.search(searchRequest, {
            onNext(result: SearchResult<Product>) {
                res.status(200).json(result)
            },
            onError(error: Error) {
                res.end();
                next(error);
            },
            onEnd() {
                res.end();
            }
        });
    };
    public setupRoutes(app: express.Application) {
        this.router.post(`${this.path}/`, this.create);
        this.router.get(`${this.path}/`, this.search);;
        app.use("/", this.router);
    }
}


