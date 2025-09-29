import QRCode from "qrcode";
import fs from "fs";

// Example product verification link
// You’ll replace `TOPIC_ID` with the actual Topic ID from Step 2
const topicId = "0.0.6916503"; 
const verifyUrl = `https://hashscan.io/testnet/topic/${topicId}`;

// Generate QR code and save as image
QRCode.toFile(
  "haircare_qr.png",
  verifyUrl,
  {
    color: {
      dark: "#000000", // QR code color
      light: "#ffffff", // background
    },
    width: 300,
  },
  function (err) {
    if (err) throw err;
    console.log("✅ QR Code generated: haircare_qr.png");
    console.log("Scan this QR to verify product:", verifyUrl);
  }
);
