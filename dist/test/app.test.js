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
Object.defineProperty(exports, "__esModule", { value: true });
const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { init } = require("../lib/server");
describe("GET /", () => {
    let server;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield init();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    it("get product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "get",
            url: "/products?offset=10&count=1",
        });
        expect(res.statusCode).to.equal(200);
    }));
    it("upload new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "post",
            url: "/product",
            payload: {
                name: "unit testing product",
                price: 200,
                description: "just for testing",
            },
        });
        expect(res.statusCode).to.equal(200);
    }));
    it("update new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "put",
            url: "/product/1",
            payload: {
                name: "unit testing product",
                price: 200,
                description: "just for testing",
            },
        });
        expect(res.statusCode).to.equal(200);
    }));
    it("delete product", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield server.inject({
            method: "delete",
            url: "/product/90",
        });
        expect(res.statusCode).to.equal(200);
    }));
});
