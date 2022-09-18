const Product = require("../models/Product")

exports.getProductService = async () => {
    const products = await Product.find({});
    return products;
}

exports.createProductService = async (data) => {
    const products = await Product.create(data);
    return products;
}