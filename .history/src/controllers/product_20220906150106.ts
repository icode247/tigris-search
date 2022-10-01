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

public getBlog = async (req: Request, res: Response) => {
    try {
        const blog = await this.blogs.findOne({
            id: Number.parseInt(req.params.id),
        });
        if (!blog) {
            return res.status(404).json({
                data: blog,
                message: "Blog not found!",
            });
        }
        return res.status(200).json({
            data: blog
        });
    } catch (e) {
        res.status(500).json({
            message: "An error occured:" + e,
        });
    }
};

public updateBlog = async (req: Request,
    res: Response,) => {
    try {
        await this.blogs.update({ id: parseInt(req.params.id) }, req.body);
        res.status(200).json({
            message: "Blog Updated"
        });

    } catch (e) {
        res.status(500).json({
            message: "An error occured:" + e,
        });
    }
}
public deleteBlog = async (
    req: Request,
    res: Response,
) => {
    try {
        await this.blogs.delete({
            id: Number.parseInt(req.params.id),
        });
        res.status(200).json({
            message: "Blog deleted",
        });
    } catch (e) {
        res.status(500).json({
            message: "An error occured:" + e,
        });
    }
};
}


