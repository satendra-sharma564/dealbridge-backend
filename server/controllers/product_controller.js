const Product = require('../models/product_model');
const { postProductToTelegram } = require('../bot/telegramService');

// GET ALL
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// ADD PRODUCT — auto Telegram post
exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);

    // ✅ Telegram pe auto post (fire & forget — response block nahi hota)
    postProductToTelegram(product).catch(err =>
        console.error('Telegram post failed:', err.message)
    );
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