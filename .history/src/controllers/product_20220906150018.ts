import express, { Request, Response, Router } from "express";
import { Collection, DB } from "@tigrisdata/core";
import { Blog } from "../models/blog";
import { Controller } from "./controller";

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
}

interface Controller {
    setupRoutes(app: express.Application);
}

