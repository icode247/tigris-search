import express, { Request, Response, Router } from "express";
import { Collection, DB, SearchRequest } from "@tigrisdata/core";
import { Product } from "../models/product";

interface Controller {
    setupRoutes(app: express.Application);
}


export class ProductController implements Controller {
    private readonly db: DB;
    private readonly blogs: Collection<Product>;
    private readonly router: Router;
    private readonly path: string;

    constructor(db: DB, app: express.Application) {
        this.blogs = db.getCollection<Product>("blogs");
        this.path = "/product";
        this.router = Router();
        this.db = db;
        this.setupRoutes(app);
    }

    public createBlog = async (req: Request, res: Response) => {
        try {
            const newBlog = await this.blogs.insert(req.body);

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
    public getBlogs = async (req: Request, res: Response) => {
        try {
            const request: SearchRequest<Ca></Ca> = {
                q: "\"adventure park\"",
              };
              
            const blogs = await this.blogs.search()
            res.status(200).json({
                data: blogs
            });
        } catch (e) {
            res.status(500).json({
                message: "An error occured:" + e,
            });
        }
    }
    public setupRoutes(app: express.Application) {
        this.router.post(`${this.path}/`, this.createBlog);
        this.router.get(`${this.path}/`, this.getBlogs);;
        app.use("/", this.router);
    }
}


