import express, { Request, Response, Router } from "express";
import { Collection, DB } from "@tigrisdata/core";
import { Product } from "../models/product";

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

    public createBlog = async (req: Request, res: Response) => {
        try {
            const newBlog = await this.products.insert(req.body);

            res.status(200).json({
                data: newBlog,
                message: "Blog Created!",
            });
        } catch (e) {
            res.status(500).json({
                message: "An error occured:" + e,
            });
        }
    }
    // public searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    //     const searchRequest: SearchRequest<Product> = req.body;
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     this.products.search(searchRequest, {
    //         onNext(result: SearchResult<Product>) {
    //             res.write(JSON.stringify(result));
    //         },
    //         onError(error: Error) {
    //             res.end();
    //             next(error);
    //         },
    //         onEnd() {
    //             res.end();
    //         }
    //     });
    // };
    public setupRoutes(app: express.Application) {
        this.router.post(`${this.path}/`, this.createBlog);
        // this.router.get(`${this.path}/`, this.getBlogs);;
        app.use("/", this.router);
    }
}


