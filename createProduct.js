// createProduct.cjs
const { Client, PrivateKey, TopicId, TopicMessageSubmitTransaction, Hbar } = require("@hashgraph/sdk");
const fs = require("fs");
const QRCode = require("qrcode");
require('dotenv').config();

// -------------------------
// Setup Hedera Client
// -------------------------
const client = Client.forTestnet();  // Change to Mainnet if needed
client.setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY_HEX);

// -------------------------
// Existing Topic ID
// -------------------------
const topicId = TopicId.fromString("0.0.6916503");  // Your saved topic ID

// -------------------------
// Product Info
// -------------------------
const productBatch = "HairCare-Batch-001";
const message = `Product ${productBatch} created successfully!`;

// -------------------------
// Create QR Code
// -------------------------
async function generateQRCode(text, filePath) {
    try {
        await QRCode.toFile(filePath, text);
        console.log(`QR code generated at ${filePath}`);
    } catch (err) {
        console.error("Error generating QR code:", err);
    }
}

// -------------------------
// Submit Message to Hedera Topic
// -------------------------
async function createProduct() {
    try {
        const submitTx = await new TopicMessageSubmitTransaction()
            .setTopicId(topicId)
            .setMessage(message)
            .execute(client);

        const receipt = await submitTx.getReceipt(client);

        console.log(message);
        console.log("Transaction status:", receipt.status.toString());

        // Generate QR code with topic ID + product batch
        const qrFilePath = `assets/${productBatch}-QR.png`;
        await generateQRCode(`Topic: ${topicId.toString()} | Product: ${productBatch}`, qrFilePath);

    } catch (err) {
        console.error("Error creating product:", err);
    }
}

createProduct();
