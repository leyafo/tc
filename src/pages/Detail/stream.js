
import {
  StreamClient,
  Cluster,
  BN,
  getBN,
} from "@streamflow/stream";


// import { Wallet } from "@project-serum/anchor";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

import { requestAirdrop } from "./test-lib/airdrop/airdrop-request.js";
// import { AIRDROP_AMOUNT } from "./test-lib/constants";
// import { TX_FINALITY_CONFIRMED } from "./test-lib/constants";
import * as web3 from "@solana/web3.js";


// let sender = new Wallet(web3.Keypair.generate());
let sender = web3.Keypair.generate();
let recipient = web3.Keypair.generate().publicKey;
let mint = web3.Keypair.generate().publicKey;
// console.log(sender)

const sClient = new StreamClient(
  "https://api.devnet.solana.com",
  Cluster.Devnet,
  "confirmed"
);

export default function fn () {
  requestAirdrop(sender, sClient.connection)
}

// const wallet = Wallet.

// const createStreamParams = {
//   sender: sender, // Wallet/Keypair signing the transaction, creating and sending the stream.
//   recipient: recipient, // Solana recipient address.
//   mint: mint, // SPL Token mint.
//   start: 1643363040, // Timestamp (in seconds) when the stream/token vesting starts.
//   depositedAmount: getBN(100, 9), // depositing 100 tokens with 9 decimals mint.
//   period: 1, // Time step (period) in seconds per which the unlocking occurs.
//   cliff: 1643363160, // Vesting contract "cliff" timestamp in seconds.
//   cliffAmount: new BN(10), // Amount unlocked at the "cliff" timestamp.
//   amountPerPeriod: getBN(5, 9), // Release rate: how many tokens are unlocked per each period.
//   name: "Transfer to Jane Doe.", // The stream name or subject.
//   canTopup: false, // setting to FALSE will effectively create a vesting contract.
//   cancelableBySender: true, // Whether or not sender can cancel the stream.
//   cancelableByRecipient: false, // Whether or not recipient can cancel the stream.
//   transferableBySender: true, // Whether or not sender can transfer the stream.
//   transferableByRecipient: false, // Whether or not recipient can transfer the stream.
//   automaticWithdrawal: true, // Whether or not a 3rd party (e.g. cron job, "cranker") can initiate a token withdraw/transfer.
//   withdrawalFrequency: 10, // Relevant when automatic withdrawal is enabled. If greater than 0 our withdrawor will take care of withdrawals. If equal to 0 our withdrawor will skip, but everyone else can initiate withdrawals.
//   partner: null, //  (optional) Partner's wallet address (string | null).
// };
//
// export const fn = async () => {
//   // console.log(createStreamParams)
//   const a = await sClient.create(createStreamParams);
//   // console.log(a)
//   return a
// }

