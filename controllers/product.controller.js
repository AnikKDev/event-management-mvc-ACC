
const Product = require('../models/Product');
const { getProductService, createProductService, updateProductService, bulkUpdateServicec, bulkUpdateService, deleteProductService, bulkDeleteService } = require('../services/product.services');
exports.getProduct = async (req, res, next) => {
    try {
        // const result = await Product.find({ status: { $ne: 'in-stock' } });
        // const result = await Product.find({ quantity: { $gt: 100 } });
        // const result = await Product.find({ name: { $in: ['chaal', 'begun'] } });
        // const result = await Product.find({}, 'name quantity');
        // const result = await Product.find({}).limit(1);
        // const result = await Product.find({}).sort({ quantity: -1 });
        //it will sort the quantity bigger one to smaller one's

        //  using where equals from mongoose
        // const result = await Product.where('name').equals('chaal').where('quantity').gt(100);
        // const result = await Product.findById('6323131afddd4441bc2a32d4');


        // jodi amra ekta object theke kichu delete kori tahole sheta puro vanish hoye jaabe. jaar jonno amra prothome query params theke ja ja pabo sheguloke spread operator diye arekta variable e niye nibo.
        let filters = { ...req.query };

        // sort, page, limit --> exclude
        const excludFields = ['page', 'limit'];
        // amra oi object theke delete kortesi (eta object theke property delete korar method)
        excludFields.map(field => delete filters[field])

        // filtering with operators
        // {price:{$gt:50}}   ->> it will check greater than 50 values
        // console.log(filters)
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filtersString);
        // sorting based on query with more flexibility from client side
        let queryItem = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryItem.sortBy = sortBy;
        };

        // checking if query contains fields or not
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryItem.fields = fields;
        }

        //it will return every object
        const result = await getProductService(filters, queryItem.sortBy, queryItem.fields);
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

exports.createProduct = async (req, res, next) => {

    try {
        // console.log(req.body);

        // data insert korar jonno duita poddhoti use kora jay. Save ar Create.

        // save : prothome ekta instance create kora lagbe model theke.
        /* const product = new Product(req.body);
    // instance creation -> do something -> save()
    if(product.quantity===0){
      product.status='out of stock
      ;}
        const result = await product.save() */



        // crete: instance create korar dorkar hoyna,direct action
        const result = await createProductService(req.body);
        result.logger();
        res.status(200).send({
            status: "success",
            data: result
        })
    } catch (err) {
        res.status(400).send({
            status: err.message,
            message: 'Error',
        })
    }

}


// update product
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductService(id, req.body);
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            status: err.message,
            message: 'Can not update the product',
        })
    }
}
// delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                success: false,
                message: "Couldn't delete the product"
            })
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            status: err.message,
            message: 'Can not delete the product',
        })
    }
}

// bulk update
exports.bulkUpdate = async (req, res, next) => {
    try {
        const result = await bulkUpdateService(req.body);
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            status: err.message,
            message: 'Can not update the product',
        })
    }
}

// bulk delete
module.exports.bulkDelete = async (req, res, next) => {
    try {
        const result = await bulkDeleteService(req.body.ids);
        // const result = await bulkDeleteService(req.body.ids);
        if (!result.deletedCount) {
            return res.status(400).json({
                success: false,
                message: "Couldn't delete the product"
            })
        }
        res.status(200).send({
            success: true,
            message: "Successfully deleted selected items",
            data: result
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Couldn't delete the selected items"
        })
    }
}

