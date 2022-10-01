import express, { Request, Response, NextFunction, Router } from "express";
import { Collection, DB } from "@tigrisdata/core";
import { Product } from "../models/product";
import { SearchRequest, SearchResult } from "@tigrisdata/core/dist/search/types";
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

    public create = async (req: Request, res: Response,  next: NextFunction) => {
        try {
            const newBlog = await this.products.insert(req.body);

            res.status(200).json({
                data: newBlog,
                message: "Blog Created!",
            });
        } catch (e) {
           next(e)
        }
    }
    public search = async (req: Request, res: Response, next: NextFunction) => {
        const searchRequest: SearchRequest<Product> = req.body;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        this.products.search(searchRequest, {
            onNext(result: SearchResult<Product>) {
                res.status(201)
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


