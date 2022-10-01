import express, { Request, Response, NextFunction } from "express";
import { DB } from "@tigrisdata/core";
interface Controller {
    setupRoutes(app: express.Application): any;
}
export declare class ProductController implements Controller {
    private readonly db;
    private readonly blogs;
    private readonly router;
    private readonly path;
    private products;
    constructor(db: DB, app: express.Application);
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    search: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    setupRoutes(app: express.Application): void;
}
export {};
