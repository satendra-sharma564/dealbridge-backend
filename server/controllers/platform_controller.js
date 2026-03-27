exports.getPlatforms = (req, res) => {
    res.json({
        success: true,
        data: [
            {
                name: "Myntra",
                logo: "https://cdn.worldvectorlogo.com/logos/myntra-1.svg",
                link: "https://myntr.it/I2w661u",
                color: "#ffe6f0"
            },
            {
                name: "Ajio",
                logo: "https://cdn.worldvectorlogo.com/logos/ajio-1.svg",
                link: "https://ajiio.in/HR7e33a",
                color: "#f2f2f2"
            }
        ]
    });
};

exports.addPlatform = (req, res) => {
    const { name, logo, link, color } = req.body;
    const platform = new Platform({ name, logo, link, color });
    platform.save();
    res.json({ success: true, data: platform });
};

exports.updatePlatform = async (req, res) => {
    const { name, logo, link, color } = req.body;
    const platform = await Platform.findByIdAndUpdate(req.params.id, { name, logo, link, color }, { new: true });
    res.json({ success: true, data: platform });
};

exports.deletePlatform = async (req, res) => {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: platform });
};