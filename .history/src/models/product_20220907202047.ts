import {
    TigrisCollectionType,
    TigrisDataTypes,
    TigrisSchema
} from "@tigrisdata/core/dist/types";

export interface Product extends TigrisCollectionType {
    id?: number;
    name: string;
    price: number;
    status: string;
    quantity: in
}

export const productSchema: TigrisSchema<Product> = {
   id: {
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
