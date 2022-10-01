import { TigrisCollectionType, TigrisSchema } from "@tigrisdata/core/dist/types";
export interface Product extends TigrisCollectionType {
    id?: number;
    name: string;
    price: number;
    status: string;
    quantity: number;
}
export declare const productSchema: TigrisSchema<Product>;
