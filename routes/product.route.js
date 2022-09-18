const express = require('express');
const { getProduct, createProduct } = require('../controllers/product.controller');

const router = express.Router();

router.route('/').get(getProduct).post(createProduct)

module.exports = router;