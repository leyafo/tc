import React from "react";
import "./index.scss";

function Introduction() {
  return (
    <div className="introduction-page page">
      <div className="header">
        <img
          className="icon"
          src={require("./images/project-logo.png")}
          alt=""
        />
        <span className="text">LARIX</span>
      </div>
      <div className="content">
        Larix是Solana公链的终极借贷门户，采用动态利率模型，创建高效的风险管理资金池，在保障资产安全性的前提下被充分使用。除Solana生态的基本借贷外，Larix将支持指数，黄金，美股，NFTs等新型合成资产的抵押和借贷。
      </div>
      <div className="info">
        <div className="info-item">
          <div className="label">排名</div>
          <div className="value">NO.5</div>
        </div>
        <div className="info-item">
          <div className="label">市值</div>
          <div className="value">$41,395 Mio</div>
        </div>
        <div className="info-item">
          <div className="label">流通数量</div>
          <div className="value">1312313.09</div>
        </div>
        <div className="info-item">
          <div className="label">最大供给量</div>
          <div className="value">2000,000,000</div>
        </div>
        <div className="info-item">
          <div className="label">持币地址数</div>
          <div className="value">10,000</div>
        </div>
      </div>
      <div className="project-link">
        <div className="link-title">项目链接</div>
        <div className="link-list">
          <a className="link-item">官网</a>
          <a className="link-item">白皮书</a>
          <a className="link-item">Twitter</a>
          <a className="link-item">Telegram</a>
          <a className="link-item">Discord</a>
          <a className="link-item">区块链浏览器</a>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
