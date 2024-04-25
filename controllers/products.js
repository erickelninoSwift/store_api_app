const getAllproducts = async (request, response) => {
  response.status(200).json({
    message: "Get All products",
  });
};

const getAllProductStatic = async (request, response) => {
  response.status(200).json({
    message: "Get All products Static",
  });
};

module.exports = { getAllproducts, getAllProductStatic };
