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
import bs58 from "bs58";
import { sign } from "tweetnacl";

function Temp() {
  const [isLoading, setIsLoading] = useState(false);

  const [from, setFrom] = useState("");
  const [fromBalance, setFromBalance] = useState("--");

  const [message, setMessage] = useState("Hello Fisher!");

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

      return address;
    }
    return "";
  };
  const signMessage = async data => {
    setIsLoading(true);

    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    let fromPublicKey = new PublicKey(data.from);

    try {
      // let transaction = new Transaction();

      const message = new TextEncoder().encode(data.message);
      const { signature } = await window.solana.signMessage(message);
      console.log("signature:", signature);

      if (!sign.detached.verify(message, signature, fromPublicKey.toBytes())) {
        console.log("报错");
        return "";
      }

      let txid = bs58.encode(signature);
      console.log("txid:", txid);

      // let txid = await connection.sendRawTransaction(signature.serialize());
      // console.log("txid:", txid);

      // transaction.feePayer = fromPublicKey; //fee   Payment user
      // transaction.recentBlockhash = (
      //   await connection.getRecentBlockhash("max")
      // ).blockhash; // Latest transaction hash(最新的交易hash)

      // const resutl = await connection.confirmTransaction(txid);
      // console.log("resutl:", resutl);

      setIsLoading(false);
      return true;
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

  const onInputMessage = event => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleSubmit = async () => {
    const data = {
      from,
      message
    };

    console.log("handleSubmit === data:", data);
    const result = await signMessage(data);
    console.log("result:", result);
  };

  return (
    <div className="temp2-wrap">
      <div>from:</div>
      <div>{shortenAddress(from, 10)}</div>
      <div>余额：{bNToN(fromBalance, 9)}</div>
      <br />
      <br />
      <div>message:</div>
      <input type="text" value={message} onChange={onInputMessage} />
      <br />
      <br />
      <div>
        <button className="c-btn" onClick={handleSubmit}>
          {isLoading && <LoadingOutlined className="icon-loading" />}
          signMessage 信息
        </button>
      </div>
    </div>
  );
}

export default Temp;
