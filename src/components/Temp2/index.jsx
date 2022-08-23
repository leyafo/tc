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

import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

function Temp() {
  const [isLoading, setIsLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("3bwHz3JsEKdGvxsNnc6UieZopYDZqB5v6TM2VstH1vWg");

  const [fromBalance, setFromBalance] = useState("--");
  const [toBalance, setToBalance] = useState("--");

  const [amount, setAmount] = useState(1);
  const [contract, setContract] = useState(
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
  );

  const connectWallet = async () => {
    if (window.solana) {
      if (!window.solana.isConnected) {
        await window.solana.connect();
      }
      const address = window.solana.publicKey.toString();

      // console.log("window.solana22:", window.solana);
      // console.log("window.solana.network22:", window.solana.network);

      let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const fromPublicKey = new PublicKey(address);
      const fromBalance = await connection.getBalance(fromPublicKey);
      setFromBalance(fromBalance);

      let toPublicKey = new PublicKey(to);
      const toBalance = await connection.getBalance(toPublicKey);
      setToBalance(toBalance);

      return address;
    }
    return "";
  };
  const signTransaction = async data => {
    setIsLoading(true);

    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    let fromPublicKey = new PublicKey(data.from);
    let toPublicKey = new PublicKey(data.to);

    let transaction = new Transaction();
    try {
      if (data.contract) {
        // let TokenPublicKey = new PublicKey(data.contract);
        // console.log("TokenPublicKey:", TokenPublicKey);
        // console.log("TOKEN_PROGRAM_ID:", TOKEN_PROGRAM_ID);
        // console.log("fromPublicKey:", fromPublicKey);
        // let TokenInstance = new Token(
        //   connection,
        //   TokenPublicKey,
        //   TOKEN_PROGRAM_ID,
        //   fromPublicKey
        // );
        // console.log("TokenInstance:", TokenInstance);
        // let fromTokenAccount =
        //   await TokenInstance.getOrCreateAssociatedAccountInfo(fromPublicKey);
        // let toTokenAccount =
        //   await TokenInstance.getOrCreateAssociatedAccountInfo(toPublicKey);
        // console.log("fromTokenAccount:", fromTokenAccount);
        // console.log("toTokenAccount:", toTokenAccount);
        // console.log("fromTokenAccount.address:", fromTokenAccount.address);
        // console.log("toTokenAccount.address:", toTokenAccount.address);
        // transaction.add(
        //   Token.createTransferInstruction(
        //     TOKEN_PROGRAM_ID,
        //     fromTokenAccount.address,
        //     toTokenAccount.address,
        //     fromPublicKey,
        //     [],
        //     data.value * 1e6
        //   )
        // );

        // =================================

        // const mintPublicKey = new PublicKey(data.contract);

        // const mintToken = new Token(
        //   connection,
        //   mintPublicKey,
        //   TOKEN_PROGRAM_ID,
        //   fromPublicKey
        // );

        // const fromTokenAccount = await Token.getOrCreateAssociatedTokenAccount(
        //   connection,
        //   fromPublicKey,
        //   mintPublicKey,
        //   fromPublicKey
        // );
        // console.log("fromTokenAccount:", fromTokenAccount);

        // const destPublicKey = new web3.PublicKey(to);

        // const associatedDestinationTokenAddr =
        //   await splToken.getOrCreateAssociatedTokenAccount(
        //     connection,
        //     wallet.payer,
        //     mintPublicKey,
        //     destPublicKey
        //   );

        // const receiverAccount = await connection.getAccountInfo(
        //   associatedDestinationTokenAddr.address
        // );

        // const instructions = [];

        // instructions.push(
        //   splToken.createTransferInstruction(
        //     fromTokenAccount.address,
        //     associatedDestinationTokenAddr.address,
        //     wallet.publicKey,
        //     amount,
        //     [],
        //     TOKEN_PROGRAM_ID
        //   )
        // );

        // transaction.add(...instructions);

        // =================================
        const mintPublicKey = new PublicKey(data.contract);

        const mintToken = new Token(
          connection,
          mintPublicKey,
          TOKEN_PROGRAM_ID,
          fromPublicKey
        );

        // console.log("mintToken:", mintToken);
        // console.log(
        //   "mintToken.publicKey.toString:",
        //   mintToken.publicKey.toString()
        // );

        // console.log("fromPublicKey:", fromPublicKey.toString());
        const fromTokenAccount =
          await mintToken.getOrCreateAssociatedAccountInfo(fromPublicKey);
        console.log("fromTokenAccount:", fromTokenAccount.address);

        const destPublicKey = toPublicKey;
        const associatedDestinationTokenAddr =
          await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            destPublicKey
          );

        console.log(
          "associatedDestinationTokenAddr:",
          associatedDestinationTokenAddr
        );

        const receiverAccount = await connection.getAccountInfo(
          associatedDestinationTokenAddr
        );
        console.log("receiverAccount:", receiverAccount);

        const instructions = [];

        if (receiverAccount === null) {
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              mintToken.associatedProgramId,
              mintToken.programId,
              mintPublicKey,
              associatedDestinationTokenAddr,
              destPublicKey,
              fromPublicKey
            )
          );
        }

        instructions.push(
          Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            fromTokenAccount.address,
            associatedDestinationTokenAddr,
            fromPublicKey,
            [],
            data.value * 1e6
          )
        );

        transaction.add(...instructions);
      } else {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(data.from),
            toPubkey: new PublicKey(data.to),
            lamports: data.value * 1e9 // 10^9 = 1 SOL
          })
        );
      }

      // let fromPublicKey = new solanaWeb3.PublicKey(data.from);
      transaction.feePayer = fromPublicKey; //fee   Payment user
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash("max")
      ).blockhash; // Latest transaction hash(最新的交易hash)

      let signed = await window.solana.signTransaction(transaction);

      console.log("signed:", signed);

      let txid = await connection.sendRawTransaction(signed.serialize());
      console.log("txid:", txid);

      setIsLoading(false);
      return await connection.confirmTransaction(txid);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return "";
    }
  };

  const init = async () => {
    const address = await connectWallet();
    console.log("address222:", address);

    if (address) {
      setFrom(address);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // const onInputFrom = event => {
  //   const value = event.target.value;
  //   setFrom(value);
  // };

  const onInputTo = event => {
    const value = event.target.value;
    setTo(value);
  };

  const onInputAmount = event => {
    const value = event.target.value;
    setAmount(value);
  };
  const onInputContract = event => {
    const value = event.target.value;
    setContract(value);
  };

  const handleSubmit = async () => {
    const data = {
      from,
      to,
      value: amount,
      contract
    };
    console.log("handleSubmit === data:", data);
    const result = await signTransaction(data);
    console.log("result:", result);
    if (result) {
      let connection = new Connection(
        clusterApiUrl(window.solana.network),
        "confirmed"
      );

      const fromPublicKey = new PublicKey(from);
      const fromBalance = await connection.getBalance(fromPublicKey);
      setFromBalance(fromBalance);

      let toPublicKey = new PublicKey(to);
      const toBalance = await connection.getBalance(toPublicKey);
      setToBalance(toBalance);
    }
  };

  return (
    <div className="temp2-wrap">
      <div>from:</div>
      <div>{shortenAddress(from, 10)}</div>
      <div>余额：{bNToN(fromBalance, 9)}</div>
      <br />
      <br />
      <div>to:</div>
      <input type="text" value={to} onChange={onInputTo} />
      <div>余额：{bNToN(toBalance, 9)}</div>
      <br />
      <br />
      <div>amount:</div>
      <input type="text" value={amount} onChange={onInputAmount} />
      <br />
      <br />
      <div>token address:</div>
      <input type="text" value={contract} onChange={onInputContract} />
      <br />
      <br />
      <div>
        <button className="c-btn" onClick={handleSubmit}>
          {isLoading && <LoadingOutlined className="icon-loading" />}
          转账 / 交易
        </button>
      </div>
    </div>
  );
}

export default Temp;
