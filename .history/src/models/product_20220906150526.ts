import {
    TigrisCollectionType,
    TigrisDataTypes,
    TigrisSchema
} from "@tigrisdata/core/dist/types";

export interface Product extends TigrisCollectionType {
    Id?: number;
    name: string;
    price: number;
    status: string;
}

export const productSchema: TigrisSchema<Product> = {
   Id: {
        type: TigrisDataTypes.INT32,
        primary_key: {
            order: 1,
            autoGenerate: true,
        },
    },
    name: {
        type: TigrisDataTypes.STRING,
    },
    price: {
        type: TigrisDataTypes.NUMBER,
    },
    status: {
        type: TigrisDataTypes.STRING,

    }
};
