"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const types_1 = require("@tigrisdata/core/dist/types");
exports.productSchema = {
    id: {
        type: types_1.TigrisDataTypes.INT32,
        primary_key: {
            order: 1,
            autoGenerate: true,
        },
    },
    name: {
        type: types_1.TigrisDataTypes.STRING,
    },
    price: {
        type: types_1.TigrisDataTypes.NUMBER,
    },
    status: {
        type: types_1.TigrisDataTypes.STRING,
    },
    quantity: {
        type: types_1.TigrisDataTypes.NUMBER,
    }
};
