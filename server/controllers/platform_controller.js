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