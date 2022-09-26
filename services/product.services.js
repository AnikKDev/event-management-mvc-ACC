const Product = require("../models/Product")

exports.getProductService = async (filters, sort, fields) => {
    // const products = await Product.find(filters);
    const products = await Product
        .find(filters)
        .select(fields)
        .sort(sort);
    return products;
}

exports.createProductService = async (data) => {
    const products = await Product.create(data);
    return products;
}

// 
exports.updateProductService = async (productId, data) => {
    // first way
    /*  const result = await Product.updateOne({ _id: productId }, { $set: data }, {
         runValidators: true
     }); */
    const result = await Product.updateOne({ _id: productId }, { $inc: data }, {
        runValidators: true
    });

    // query
    /* const product = await Product.findById(productId);
    const result = await product.set(data).save(); */
    return result;
}

// 
exports.deleteProductService = async (productId) => {
    // first way
    /*  const result = await Product.updateOne({ _id: productId }, { $set: data }, {
         runValidators: true
     }); */
    const result = await Product.deleteOne({ _id: productId });

    // query
    /* const product = await Product.findById(productId);
    const result = await product.set(data).save(); */
    return result;
}

// bulk update service
exports.bulkUpdateService = async (data) => {
    // this is one way of updating multiple data
    /* const result = await Product.updateMany({ _id: data.ids }, data.data, {
        runValidators: true
    }); */

    // another one
    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));

    })
    const result = await Promise.all(products);
    return result;
}
// bulk delete
module.exports.bulkDeleteService = async (id) => {
    const result = await Product.deleteMany({});
    return result;
}