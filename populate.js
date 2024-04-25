require("dotenv").config();
const Allproducts = require("./products.json");
const productDB = require("./models/product");
const { connectDB } = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.URI_CONNECT);
    await productDB.deleteMany();
    await productDB.create(Allproducts);
    console.log("data was popluated with success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
