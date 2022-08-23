import React, { useEffect, useState } from "react";
import "./index.scss";

import { LoadingOutlined } from "@ant-design/icons";
import {
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  clusterApiUrl,
  Connection,
  PublicKey
} from "@solana/web3.js";

import * as splToken from "@solana/spl-token";
import { shortenAddress, bNToN } from "@/utils/";

function Temp() {
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState("--");
  const [balance, setBalance] = useState("--");
  // const [to, setTo] = useState("3ZbAPXwiAydpXFFB195FEbSEBhQNoN3LxXe3fTo8iwML");
  // const [amount, setAmount] = useState(1);
  // const [contract, setContract] = useState("");

  const connectWallet = async () => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        console.log("222");
        await window.solana.connect();
      }
      const address = window.solana.publicKey.toString();

      // console.log("window.solana:", window.solana);
      // console.log("window.solana.network:", window.solana.network);

      // let connection = new Connection(clusterApiUrl("testnet"), "confirmed");
      let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const addressPubkey = window.solana.publicKey;
      const balance = await connection.getBalance(addressPubkey);
      setBalance(balance);

      return address;
    }
    return "";
  };
  // const signTransaction = async data => {
  //   // const from = document.querySelector("#from").value,
  //   //   to = document.querySelector("#to").value,
  //   //   amount = document.querySelector("#amount").value,
  //   //   contract = document.querySelector("#contract").value;

  //   // const data = {
  //   //   from,
  //   //   to,
  //   //   value: amount,
  //   //   contract
  //   // };

  //   let connection = new Connection(
  //     clusterApiUrl(window.solana.network),
  //     "confirmed"
  //   );
  //   let fromPublicKey = new PublicKey(data.from);
  //   let toPublicKey = new PublicKey(data.to);

  //   let transaction = new Transaction();
  //   try {
  //     if (data.contract) {
  //       // let TokenPublicKey = new PublicKey(data.contract);
  //       // let TokenInstance = new splToken.Token(
  //       //   connection,
  //       //   TokenPublicKey,
  //       //   splToken.TOKEN_PROGRAM_ID,
  //       //   fromPublicKey
  //       // );
  //       // let fromTokenAccount =
  //       //   await TokenInstance.getOrCreateAssociatedAccountInfo(fromPublicKey);
  //       // let toTokenAccount =
  //       //   await TokenInstance.getOrCreateAssociatedAccountInfo(toPublicKey);
  //       // transaction.add(
  //       //   splToken.Token.createTransferInstruction(
  //       //     splToken.TOKEN_PROGRAM_ID,
  //       //     fromTokenAccount.address,
  //       //     toTokenAccount.address,
  //       //     fromPublicKey,
  //       //     [],
  //       //     data.value * 1e6
  //       //   )
  //       // );
  //     } else {
  //       transaction.add(
  //         SystemProgram.transfer({
  //           fromPubkey: new PublicKey(data.from),
  //           toPubkey: new PublicKey(data.to),
  //           lamports: data.value * 1e9 // 10^9 = 1 SOL
  //         })
  //       );
  //     }

  //     // let fromPublicKey = new solanaWeb3.PublicKey(data.from);
  //     transaction.feePayer = fromPublicKey; //fee   Payment user
  //     transaction.recentBlockhash = (
  //       await connection.getRecentBlockhash("max")
  //     ).blockhash; // Latest transaction hash(最新的交易hash)

  //     let signed = await window.solana.signTransaction(transaction);
  //     console.log("signed:", signed);

  //     let txid = await connection.sendRawTransaction(signed.serialize());
  //     console.log("txid:", txid);

  //     return await connection.confirmTransaction(txid);
  //   } catch (error) {
  //     console.error(error);
  //     //   alert(JSON.stringify(error));
  //   }
  // };

  const init = async () => {
    const address = await connectWallet();
    console.log("address:", address);
    if (address) {
      setFrom(address);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit1 = () => {
    let fromKeypair = Keypair.generate();
    let toKeypair = Keypair.generate();
    let transaction = new Transaction();

    console.log("fromKeypair:", fromKeypair);
    console.log("toKeypair:", toKeypair);
    console.log("transaction:", transaction);

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL
      })
    );

    console.log("fromKeypair.publicKey:", fromKeypair.publicKey);
    console.log("toKeypair.publicKey:", toKeypair.publicKey);
    console.log("LAMPORTS_PER_SOL:", LAMPORTS_PER_SOL);

    let keypair = Keypair.generate();
    console.log("keypair:", keypair);

    let connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // testnet
    sendAndConfirmTransaction(connection, transaction, [keypair]);
  };

  const handleSubmit2 = async () => {
    setIsLoading(true);

    let payer = Keypair.generate();
    console.log("payer:", payer);
    console.log("payer.publicKey:", payer.publicKey);
    console.log("payer.toString:", payer.toString());
    const address = window.solana.publicKey;
    console.log("address:", address);
    console.log("address.toString:", address.toString());

    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    let airdropSignature = await connection.requestAirdrop(
      address,
      LAMPORTS_PER_SOL
    );
    console.log("airdropSignature:", airdropSignature);

    const result = await connection.confirmTransaction(airdropSignature);
    console.log("result:", result);
    setIsLoading(false);

    if (result) {
      const balance = await connection.getBalance(address);
      setBalance(balance);
      console.log("balance:", balance);
    }
  };

  return (
    <div className="temp1-wrap">
      <div>
        <div>账号：{shortenAddress(from, 10)}</div>
        <div>余额：{bNToN(balance, 9)}</div>
        <br />
        <br />
        <button className="c-btn" onClick={handleSubmit2}>
          {isLoading && <LoadingOutlined className="icon-loading" />}
          空投 1sol
        </button>
      </div>
    </div>
  );
}

export default Temp;
