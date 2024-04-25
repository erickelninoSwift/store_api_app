const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    require: [true, "Price need to be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ["Zando", "Ramzted", "Pro Photography", "Thaboera IT Solutions"],
      message: "{VALUE} is not supported",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productsSchema);
