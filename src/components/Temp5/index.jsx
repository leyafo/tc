import React, { useState, useEffect } from "react";
import "./index.scss";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import {
  AccountLayout,
  TOKEN_PROGRAM_ID,
  getAccount,
  createMint
} from "@solana/spl-token";

import { useProgram } from "@/hooks/useProgram";

function Temp5() {
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
  };

  const establishConnection = async () => {
    // const rpcUrl = await getRpcUrl();
    // const rpcUrl = 'https://api.devnet.solana.com';
    // connection = new Connection(rpcUrl, 'confirmed');

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const rpcUrl = clusterApiUrl("devnet");
    const version = await connection.getVersion();
    console.log("Connection to cluster established:", rpcUrl, version);
  };

  const endpoint = "https://explorer-api.devnet.solana.com";
  const connection = new anchor.web3.Connection(endpoint);
  const programId = new anchor.web3.PublicKey(
    "78PoQT2bBAJiQxk3qBshvxvFEiPeARDAzYE6zwqpbnUv"
  );
  // const wallet = useWallet();
  const wallet = window.solana.publicKey;

  const { program } = useProgram({ connection, programId, wallet });

  useEffect(() => {
    // establishConnection();
    // init();
    // createMint();
  }, []);

  return <div className="temp5-wrap"></div>;
}

export default Temp5;
