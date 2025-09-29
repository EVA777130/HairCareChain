import { Client, AccountBalanceQuery } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    const accountId = process.env.MY_ACCOUNT_ID;
    const privateKey = process.env.MY_PRIVATE_KEY;

    if (!accountId || !privateKey) {
      throw new Error("⚠️ Missing account ID or private key in .env file");
    }

    const client = Client.forTestnet().setOperator(accountId, privateKey);

    console.log(`✅ Connected to Hedera with account: ${accountId}`);

    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    console.log(`💰 Balance: ${balance.hbars.toString()} HBAR`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();

