const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// установка схемы
const productSchema = new Schema({
  brand:  {
    type: String
  },
  title: {
    type: String
  },
  code: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  alias: {
    type: String
  },
  img: {
    type: Array
  },
  availability: {
    type: String
  },
  price:{
    type: String
  }
});

//создаем модель товара:
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
