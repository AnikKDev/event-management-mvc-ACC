
const Product = require('../models/Product');
const { getProductService, createProductService } = require('../services/product.services');
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

        //it will return every object
        const result = await getProductService();


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