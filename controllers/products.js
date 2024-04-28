const { errorWrapper } = require("../middleware/erroWrapper");
const allProductsDB = require("../models/product");

const getAllproducts = errorWrapper(async (request, response) => {
  const { company, featured, name, sort } = request.query;
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

  let datafetched = allProductsDB.find(queryObject);

  if (sort) {
    console.log(sort);
    const newSort = sort.split(",").join(" ");
    datafetched.sort(newSort);
  } else {
    datafetched.sort("-createdAt");
  }

  const myDatafetched = await datafetched;

  response.status(200).json({
    status: "success",
    products: myDatafetched,
    totlaClick: datafetched.length,
  });
});

const getAllProductStatic = errorWrapper(async (request, response) => {
  const { limit } = request.query;

  let datafetched = allProductsDB.find({}).sort("name").select("name price");
  // if (limit) {
  //   datafetched = datafetched.limit(Number(limit));
  // } else {
  //   datafetched = datafetched;
  // }

  const page = Number(request.query.page) || 1;
  const limitation = Number(request.query.limit) || 5;
  const skip = (page - 1) * limitation;

  datafetched = await datafetched.skip(skip).limit(limitation);
  response.status(200).json({
    message: datafetched,
  });
});

module.exports = { getAllproducts, getAllProductStatic };
