const { errorWrapper } = require("../middleware/erroWrapper");
const getAllproducts = errorWrapper(async (request, response) => {
  throw new Error("zero faute");
  response.status(200).json({
    message: "Get All products",
  });
});

const getAllProductStatic = errorWrapper(async (request, response) => {
  response.status(200).json({
    message: "Get All products Static",
  });
});

module.exports = { getAllproducts, getAllProductStatic };
