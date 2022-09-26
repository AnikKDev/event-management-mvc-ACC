const express = require('express');
const { getProduct, createProduct, updateProduct, bulkUpdate, deleteProduct, bulkDelete } = require('../controllers/product.controller');

const router = express.Router();
// different gulo upore
router.route('/bulk-update')
    .patch(bulkUpdate);

// bulk delete
router.route('/bulk-delete').delete(bulkDelete)

// root majhkhane ba similar gula majhkhane
router.route('/')
    .get(getProduct)
    .post(createProduct);


// dynamic route always niche rakhte hobe. naile same http method hoile kaaj na korte pare.
router.route('/:id')
    .patch(updateProduct)
    .delete(deleteProduct)

module.exports = router;