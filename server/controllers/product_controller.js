const Product = require('../models/product_model');

// GET ALL
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// ADD PRODUCT
exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};