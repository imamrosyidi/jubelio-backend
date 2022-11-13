import Hapi from "@hapi/hapi";
import { Server, Request } from "@hapi/hapi";
import Joi from "joi";
const mydb = require("./../db");
const { makeid } = require("./functions/makeid");

interface Image {
  src: String;
}
interface Product {
  id: Number;
  name: String;
  images: Array<Image>;
  price: Number;
  sku: String;
  description: String;
}

mydb
  .connect()
  .then(() => {
    console.log("Seccesful Connect to db");
  })
  .catch((e: Error) => {
    console.log(e);
  });

const server: Server = Hapi.server({
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
  handler: async (request: Request, h) => {
    const offset: Number = request.query.offset;
    const count: Number = request.query.count;
    const data: Array<Product> = await mydb.any(`SELECT *
    FROM 
    (
        SELECT 
          Row_Number() OVER (Order By sku) As RowNum
        , *
        FROM public.products
    ) t2
    WHERE RowNum >= ${offset} LIMIT ${count}`);

    await Promise.all(
      data.map(async (e: Product) => {
        e.images = await mydb.any(`SELECT src
      FROM public.images WHERE prod_id =  ${e.id}`);
      })
    );

    return { data: data };
  },
  options: {
    validate: {
      query: Joi.object({
        count: Joi.number().integer().min(1).max(100).default(8),
        offset: Joi.number().integer().min(1).default(1),
      }),
    },
  },
});
server.route({
  method: "POST",
  path: "/product",
  handler: async (request: Request, h) => {
    const produk = <Product>request.payload;
    const sku = makeid(4) + "-" + makeid(4);
    const name: String = produk.name;
    const price = produk.price;
    const description = produk.description;

    const data =
      await mydb.any(`INSERT INTO public.products (sku, name,  price, description)
    VALUES ('${sku}', '${name}',  ${price}, '${description}');`);

    return { message: "succesful" };
  },
  options: {
    validate: {
      payload: Joi.object({
        name: Joi.string().min(1).max(100),
        price: Joi.number(),
        description: Joi.string().min(1).max(1000),
      }),
    },
  },
});
server.route({
  method: "PUT",
  path: "/product/{id}",
  handler: async (request: Request, h) => {
    const produk = <Product>request.payload;
    const id = request.params.id;
    const name = produk.name;
    const price = produk.price;
    const description = produk.description;

    const data = await mydb.any(`UPDATE public.products
      SET name = '${name}', price = ${price}, description = '${description}'
      WHERE id = ${id};`);
    return { message: "succesful" };
  },
  options: {
    validate: {
      params: Joi.object({ id: Joi.number() }),
      payload: Joi.object({
        name: Joi.string().min(1).max(100),
        description: Joi.string().max(1000),
        price: Joi.number(),
      }),
    },
  },
});
server.route({
  method: "DELETE",
  path: "/product/{id}",
  handler: async (request, h) => {
    await mydb.any(
      `DELETE FROM public.products WHERE id='${request.params.id}'`
    );
    return { message: "succesful" };
  },
  options: {
    validate: {
      params: Joi.object({
        id: Joi.number(),
      }),
    },
  },
});

//for unit testing
exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};
