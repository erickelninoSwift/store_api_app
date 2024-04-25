const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const allProducts = require("./routes/products");
const allProductsStatic = require("./routes/products");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { connectDB } = require("./db/connect");
app.use("/api/v1/products", allProducts);
app.use("./api/v1/products", allProductsStatic);
app.get("/", (request, response) => {
  response.send(
    '<h1>Store API </h1> <a href="/api/v1/products">Products routes</a>'
  );
});

app.use(errorHandler);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.URI_CONNECT);
    app.listen(PORT, () => {
      console.log(`Your server is running well on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
