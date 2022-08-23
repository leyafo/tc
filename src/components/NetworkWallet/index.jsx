import React from "react";
import "./index.scss";

function NetworkWallet() {
  return (
    <>
      <div className="network-wallet">
        <div className="network">
          <img className="icon" src={require("./images/bsc.png")} alt="" />
          <span className="text">ETH</span>
        </div>
        <div className="wallet">
          <span className="text">连接钱包</span>
          <img
            className="icon"
            src={require("./images/arrow-bottom.png")}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default NetworkWallet;
