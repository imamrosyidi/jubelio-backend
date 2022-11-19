"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const joi_1 = __importDefault(require("joi"));
const mydb = require("./../db");
const { makeid } = require("./functions/makeid");
mydb
    .connect()
    .then(() => {
    console.log("Seccesful Connect to db");
})
    .catch((e) => {
    console.log(e);
});
const server = hapi_1.default.server({
    port: 3001,
    host: "localhost",
    routes: {
        cors: {
            origin: ["*"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"],
        },
    },
});
server.route({
    method: "GET",
    path: "/products",
    handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = request.query.offset - 1;
        const count = request.query.count;
        const data = yield mydb.any(`SELECT *
    FROM public.products ORDER BY id LIMIT ${count} OFFSET ${offset}`);
        yield Promise.all(data.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            e.images = yield mydb.any(`SELECT src
      FROM public.images WHERE prod_id =  ${e.id}`);
        })));
        return { data: data };
    }),
    options: {
        validate: {
            query: joi_1.default.object({
                count: joi_1.default.number().integer().min(1).max(100).default(8),
                offset: joi_1.default.number().integer().min(1).default(1),
            }),
        },
    },
});
server.route({
    method: "POST",
    path: "/product",
    handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const produk = request.payload;
        const sku = makeid(4) + "-" + makeid(4);
        const name = produk.name;
        const price = produk.price;
        const description = produk.description;
        const data = yield mydb.any(`INSERT INTO public.products (sku, name,  price, description)
    VALUES ('${sku}', '${name}',  ${price}, '${description}');`);
        return { message: "succesful" };
    }),
    options: {
        validate: {
            payload: joi_1.default.object({
                name: joi_1.default.string().min(1).max(100),
                price: joi_1.default.number(),
                description: joi_1.default.string().min(1).max(1000),
            }),
        },
    },
});
server.route({
    method: "PUT",
    path: "/product/{id}",
    handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        const produk = request.payload;
        const id = request.params.id;
        const name = produk.name;
        const price = produk.price;
        const description = produk.description;
        const data = yield mydb.any(`UPDATE public.products
      SET name = '${name}', price = ${price}, description = '${description}'
      WHERE id = ${id};`);
        return { message: "succesful" };
    }),
    options: {
        validate: {
            params: joi_1.default.object({ id: joi_1.default.number() }),
            payload: joi_1.default.object({
                name: joi_1.default.string().min(1).max(100),
                description: joi_1.default.string().max(1000),
                price: joi_1.default.number(),
            }),
        },
    },
});
server.route({
    method: "DELETE",
    path: "/product/{id}",
    handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
        yield mydb.any(`DELETE FROM public.products WHERE id='${request.params.id}'`);
        return { message: "succesful" };
    }),
    options: {
        validate: {
            params: joi_1.default.object({
                id: joi_1.default.number(),
            }),
        },
    },
});
//for unit testing
exports.init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.initialize();
    return server;
});
exports.start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
});
