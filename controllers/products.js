const { errorWrapper } = require("../middleware/erroWrapper");
const allProductsDB = require("../models/product");

const getAllproducts = errorWrapper(async (request, response) => {
  const { company, featured, name } = request.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? false : true;
  }
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  const datafetched = await allProductsDB.find(queryObject);

  response.status(200).json({
    status: "success",
    products: datafetched,
    totlaClick: datafetched.length,
  });
});

const getAllProductStatic = errorWrapper(async (request, response) => {
  const datafetched = await allProductsDB.find({}).sort("-price");
  response.status(200).json({
    message: datafetched,
  });
});

module.exports = { getAllproducts, getAllProductStatic };
