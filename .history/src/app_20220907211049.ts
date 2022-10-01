import { DB, Tigris } from "@tigrisdata/core";
import { Product, productSchema } from "./models/product";
import express from "express";
import { ProductController } from "./controllers/product";

export class Application {
    private readonly tigris: Tigris;
    private db: DB
    private readonly app: express.Application;
    private readonly PORT: string | number;
    private readonly dbName: string;

    constructor(tigris: Tigris) {
        this.tigris = tigris
        this.app = express()
        this.PORT = 3000;
        this.dbName = 'products'
        this.setup();
    }

    public async setup() {
        this.app.use(express.json());
        await this.initTigris();
    }

    public async initTigris() {
        //create a database
        this.db = await this.tigris.createDatabaseIfNotExists(this.dbName);
        console.log('database created successfully')

        //register collections
        await this.db.createOrUpdateCollection<Product>('blogs1', productSchema);

        //setup controllers
        new ProductController(this.db, this.app);
    }

    public start() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running at ${this.PORT}`)
        })
    }
}