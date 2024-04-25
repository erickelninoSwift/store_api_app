const express = require("express");
const {
  getAllproducts,
  getAllProductStatic,
} = require("../controllers/products");
const router = express.Router();

router.get("/", getAllproducts);
router.get("/static", getAllProductStatic);
module.exports = router;
