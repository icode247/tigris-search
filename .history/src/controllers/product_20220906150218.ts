import express, { Request, Response, Router } from "express";
import { Collection, DB } from "@tigrisdata/core";
import { Blog } from "../models/blog";

interface Controller {
    setupRoutes(app: express.Application);
}


export class BlogController implements Controller {
   private readonly db: DB;
   private readonly blogs: Collection<Blog>;
   private readonly router: Router;
   private readonly path: string;
	
  constructor(db: DB, app: express.Application) {
	this.blogs = db.getCollection<Blog>("blogs");
	this.path = "/blogs";
	this.router = Router();
	this.db = db;
  }
  public setupRoutes(app: express.Application) {
    this.router.post(`${this.path}/`, this.createBlog);
    this.router.get(`${this.path}/`, this.getBlogs);
    this.router.get(`${this.path}/:id`, this.getBlog);
    this.router.put(`${this.path}/:id`, this.updateBlog);
    this.router.delete(`${this.path}/:id`, this.deleteBlog);
    app.use("/", this.router);
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
        const blogs = await this.blogs.findMany(req.body);
        res.status(200).json({
            data: blogs
        });
    } catch (e) {
        res.status(500).json({
            message: "An error occured:" + e,
        });
    }
}

}


