const Click = require('../models/click_model');

exports.trackClick = async (req, res) => {
    const { productId, productTitle } = req.query;

    await Click.create({
        productId,
        productTitle
    });

    // Affiliate link generate
    const keyword = productTitle.replace(/ /g, '+');
    const affiliateLink =
        `https://www.amazon.in/s?k=${keyword}&tag=dealbridge0d-21`;

    // Redirect to Amazon
    res.redirect(affiliateLink);
};

// GET ANALYTICS
exports.getAnalytics = async (req, res) => {
    const totalClicks = await Click.countDocuments();

    const topProducts = await Click.aggregate([
        {
            $group: {
                _id: "$productTitle",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]);

    res.json({
        totalClicks,
        topProducts
    });
};