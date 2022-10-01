import { Tigris } from "@tigrisdata/core";
export declare class App {
    private readonly tigris;
    private db;
    private readonly app;
    private readonly PORT;
    private readonly dbName;
    constructor(tigris: Tigris);
    setup(): Promise<void>;
    init(): Promise<void>;
    start(): void;
}
