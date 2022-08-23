import React, { useState, useEffect } from "react";
import "./index.scss";

import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token";

function Temp3() {
  const [myTokenAccounts, setMyTokenAccounts] = useState([]);

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
    const address = await connectWallet();
    console.log("address222:", address);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromPublicKey = new PublicKey(address);

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      fromPublicKey,
      {
        programId: TOKEN_PROGRAM_ID
      }
    );

    // console.log("tokenAccounts:", tokenAccounts);

    function Uint8ArrayToString(fileData) {
      var dataString = "";
      for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
      }
      return dataString;
    }

    const myTokenAccounts = tokenAccounts.value.map(e => {
      const accountInfo = AccountLayout.decode(e.account.data);
      //   console.log("accountInfo:", accountInfo);

      return {
        address: new PublicKey(accountInfo.mint).toString(),
        amount: accountInfo.amount.toString()
      };
    });
    // console.log("myTokenAccounts:", myTokenAccounts);
    setMyTokenAccounts(myTokenAccounts);
  };

  const getTokenAccountBalance = async () => {
    // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // const TokenPublicKey = new PublicKey(
    //   "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
    // );

    // console.log("TokenPublicKey:", TokenPublicKey);

    // const TokenAccountBalance =
    //   connection.getTokenAccountBalance(TokenPublicKey);
    // console.log("TokenAccountBalance:", TokenAccountBalance);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const TokenPublicKey = new PublicKey(
      "7UX2i7SucgLMQcfZ75s3VXmZZY4YRUyJN9X1RgfMoDUi"
    );

    const tokenAccountInfo = await getAccount(connection, TokenPublicKey);

    console.log("tokenAccountInfo.amount：", tokenAccountInfo.amount);
  };

  useEffect(() => {
    init();
    getTokenAccountBalance();
  }, []);

  return (
    <div className="temp3-wrap">
      {myTokenAccounts.length ? (
        <div className="list">
          {myTokenAccounts.map(item => (
            <div className="item" key={item.address}>
              {item.address} : {item.amount}
            </div>
          ))}
        </div>
      ) : (
        <div>暂无token</div>
      )}
    </div>
  );
}

export default Temp3;
