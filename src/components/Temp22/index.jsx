import React, { useEffect, useState } from "react";
import "./index.scss";

import { LoadingOutlined } from "@ant-design/icons";
import { shortenAddress, bNToN } from "@/utils/";

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

function Temp() {
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to1, setTo1] = useState(
    "3bwHz3JsEKdGvxsNnc6UieZopYDZqB5v6TM2VstH1vWg"
  );
  const [to2, setTo2] = useState(
    "9v1e45iHv9T31fH5HVKybo9mr9L9uLxvDjQomjFUkAfn"
  );

  const [fromBalance, setFromBalance] = useState("--");
  const [toBalance1, setToBalance1] = useState("--");
  const [toBalance2, setToBalance2] = useState("--");

  const [amount, setAmount] = useState(0.1);

  const connectWallet = async () => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        await window.solana.connect();
      }
      const address = window.solana.publicKey.toString();

      let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const fromPublicKey = new PublicKey(address);
      const fromBalance = await connection.getBalance(fromPublicKey);
      setFromBalance(fromBalance);

      let toPublicKey1 = new PublicKey(to1);
      const toBalance1 = await connection.getBalance(toPublicKey1);
      setToBalance1(toBalance1);

      let toPublicKey2 = new PublicKey(to2);
      const toBalance2 = await connection.getBalance(toPublicKey2);
      setToBalance2(toBalance2);

      return address;
    }
    return "";
  };
  const signAllTransactions = async data => {
    setIsLoading(true);

    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    let fromPublicKey = new PublicKey(data.from);
    // let toPublicKey1 = new PublicKey(data.to1);
    // let toPublicKey2 = new PublicKey(data.to2);

    try {
      let transaction1 = new Transaction();
      transaction1.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(data.from),
          toPubkey: new PublicKey(data.to1),
          lamports: data.value * 1e9 // 10^9 = 1 SOL
        })
      );

      // let fromPublicKey = new solanaWeb3.PublicKey(data.from);
      transaction1.feePayer = fromPublicKey; //fee   Payment user
      transaction1.recentBlockhash = (
        await connection.getRecentBlockhash("max")
      ).blockhash; // Latest transaction hash(最新的交易hash)

      let transaction2 = new Transaction();
      transaction2.add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(data.from),
          toPubkey: new PublicKey(data.to2),
          lamports: data.value * 1e9 // 10^9 = 1 SOL
        })
      );

      // let fromPublicKey = new solanaWeb3.PublicKey(data.from);
      transaction2.feePayer = fromPublicKey; //fee   Payment user
      transaction2.recentBlockhash = (
        await connection.getRecentBlockhash("max")
      ).blockhash; // Latest transaction hash(最新的交易hash)

      let signed = await window.solana.signAllTransactions([
        transaction1,
        transaction2
      ]);
      console.log("signed:", signed);

      let txid1 = await connection.sendRawTransaction(signed[0].serialize());
      console.log("txid1:", txid1);

      let txid2 = await connection.sendRawTransaction(signed[1].serialize());
      console.log("txid2:", txid2);

      setIsLoading(false);
      const resutl1 = await connection.confirmTransaction(txid1);
      const resutl2 = await connection.confirmTransaction(txid2);
      return [resutl1, resutl2];
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return "";
    }
  };

  const init = async () => {
    const address = await connectWallet();

    if (address) {
      setFrom(address);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onInputTo1 = event => {
    const value = event.target.value;
    setTo1(value);
  };
  const onInputTo2 = event => {
    const value = event.target.value;
    setTo2(value);
  };

  const onInputAmount = event => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleSubmit = async () => {
    const data = {
      from,
      to1,
      to2,
      value: amount
    };
    console.log("handleSubmit === data:", data);
    const result = await signAllTransactions(data);
    console.log("result:", result);
    if (result) {
      let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const fromPublicKey = new PublicKey(from);
      const fromBalance = await connection.getBalance(fromPublicKey);
      setFromBalance(fromBalance);

      let toPublicKey1 = new PublicKey(to1);
      const toBalance1 = await connection.getBalance(toPublicKey1);
      setToBalance1(toBalance1);

      let toPublicKey2 = new PublicKey(to2);
      const toBalance2 = await connection.getBalance(toPublicKey2);
      setToBalance2(toBalance2);
    }
  };

  return (
    <div className="temp2-wrap">
      <div>from:</div>
      <div>{shortenAddress(from, 10)}</div>
      <div>余额：{bNToN(fromBalance, 9)}</div>
      <br />
      <br />
      <div>to1:</div>
      <input type="text" value={to1} onChange={onInputTo1} />
      <div>余额：{bNToN(toBalance1, 9)}</div>
      <br />
      <br />
      <div>to2:</div>
      <input type="text" value={to2} onChange={onInputTo2} />
      <div>余额：{bNToN(toBalance2, 9)}</div>
      <br />
      <br />
      <div>amount:</div>
      <input type="text" value={amount} onChange={onInputAmount} />
      <br />
      <br />
      <div>
        <button className="c-btn" onClick={handleSubmit}>
          {isLoading && <LoadingOutlined className="icon-loading" />}
          signAllTransactions 交易
        </button>
      </div>
    </div>
  );
}

export default Temp;
