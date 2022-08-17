import React, { useState, useEffect } from "react";
import "./index.scss";

import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import {
  AccountLayout,
  TOKEN_PROGRAM_ID,
  getAccount,
  createMint
} from "@solana/spl-token";

function Temp4() {
  const connectWallet = async () => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        await window.solana.connect();
      }
      const address = window.solana.publicKey.toString();
      return address;
    }
    return "";
  };

  const init = async () => {
    let account = Keypair.generate();

    console.log(account);
    console.log(account.publicKey.toBase58());
    console.log(account.publicKey.toString());

    console.log(account.secretKey);
    console.log(account.secretKey.toString());
  };

  const createMint = async () => {
    const address = await connectWallet();
    const fromPublicKey = new PublicKey(address);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    console.log("fromPublicKey:", fromPublicKey);

    // const mint = await createMint(
    //   connection,
    //   fromPublicKey,
    //   fromPublicKey,
    //   fromPublicKey,
    //   9
    // );

    // console.log("mint:", mint);
    // console.log("mint.toBase58():", mint.toBase58());

    // AhewH6YQeGc97yUQehZ4npTJjdLvoVUfmKGTkwMEzCAG
    // 185,141,122,196,83,50,95,223,93,126,69,56,153,228,100,126,234,30,128,142,202,212,67,166,117,48,59,129,223,144,9,21,144,35,79,17,242,150,135,90,69,18,59,26,251,240,132,95,109,28,255,205,2,51,144,96,214,181,179,198,22,121,28,221
  };

  useEffect(() => {
    init();
    // createMint();
  }, []);

  return <div className="temp4-wrap"></div>;
}

export default Temp4;
