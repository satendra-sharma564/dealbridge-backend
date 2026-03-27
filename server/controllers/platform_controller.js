// exports.getPlatforms = (req, res) => {
//     res.json({
//         success: true,
//         data: [
//             {
//                 name: "Myntra",
//                 logo: "https://cdn.worldvectorlogo.com/logos/myntra-1.svg",
//                 link: "https://myntr.it/I2w661u",
//                 color: "#ffe6f0"
//             },
//             {
//                 name: "Ajio",
//                 logo: "https://cdn.worldvectorlogo.com/logos/ajio-1.svg",
//                 link: "https://ajiio.in/HR7e33a",
//                 color: "#f2f2f2"
//             }
//         ]
//     });
// };

// exports.addPlatform = (req, res) => {
//     const { name, logo, link, color } = req.body;
//     const platform = new Platform({ name, logo, link, color });
//     platform.save();
//     res.json({ success: true, data: platform });
// };

// exports.updatePlatform = async (req, res) => {
//     const { name, logo, link, color } = req.body;
//     const platform = await Platform.findByIdAndUpdate(req.params.id, { name, logo, link, color }, { new: true });
//     res.json({ success: true, data: platform });
// };

// exports.deletePlatform = async (req, res) => {
//     const platform = await Platform.findByIdAndDelete(req.params.id);
//     res.json({ success: true, data: platform });
// };

const Platform = require('../models/platform_model');

// ✅ GET
exports.getPlatforms = async (req, res) => {
    try {
        const data = await Platform.find();
        res.json({ success: true, data });
    } catch (e) {
        console.log("❌ GET ERROR:", e);
        res.status(500).json({ success: false });
    }
};

// ✅ ADD
exports.addPlatform = async (req, res) => {
    try {
        console.log("📥 Incoming:", req.body);

        const { name, logo, link, color } = req.body;

        const platform = new Platform({ name, logo, link, color });
        await platform.save(); // ⚠️ IMPORTANT (await)

        res.status(201).json({ success: true, data: platform });

    } catch (e) {
        console.log("❌ ADD ERROR:", e);
        res.status(500).json({ success: false, error: e.message });
    }
};

// ✅ UPDATE
exports.updatePlatform = async (req, res) => {
    try {
        const platform = await Platform.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({ success: true, data: platform });
    } catch (e) {
        console.log("❌ UPDATE ERROR:", e);
        res.status(500).json({ success: false });
    }
};

// ✅ DELETE
exports.deletePlatform = async (req, res) => {
    try {
        await Platform.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) {
        console.log("❌ DELETE ERROR:", e);
        res.status(500).json({ success: false });
    }
};