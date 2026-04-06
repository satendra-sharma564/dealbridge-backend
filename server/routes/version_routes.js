const express = require('express');
const router = express.Router();

// ✅ Update this version whenever you release a new APK
// Format: "major.minor.patch" — must match pubspec.yaml version
const CURRENT_VERSION = "1.0.3"; // <-- Change this when you release a new APK
const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1laww5zacKhzsAA1EL1gJFY0h6iuvXzod";

router.get('/version', (req, res) => {
  res.json({
    latestVersion: CURRENT_VERSION,
    apkUrl: APK_DOWNLOAD_URL,
    forceUpdate: true,
    message: "Ek naya update available hai. Behtar experience ke liye please update karein. ✨"
  });
});

module.exports = router;
