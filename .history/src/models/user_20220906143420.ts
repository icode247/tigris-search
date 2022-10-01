import {
    TigrisCollectionType,
    TigrisDataTypes,
    TigrisSchema
} from "@tigrisdata/core/dist/types";

export interface User extends TigrisCollectionType {
    userId?: number;
    name: string;
    balance: number;
}

export const userSchema: TigrisSchema<User> = {
   : {
        type: TigrisDataTypes.INT32,
        primary_key: {
            order: 1,
            autoGenerate: true,
        },
    },
    name: {
        type: TigrisDataTypes.STRING,
    },
    status: {
        type: TigrisDataTypes.NUMBER,
    },
};
