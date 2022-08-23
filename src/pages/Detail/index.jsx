import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as solanaWeb3 from '@solana/web3.js';
import { Input } from "antd";
import "./index.scss";

import fn from './stream'

import NetworkWallet from "@/components/NetworkWallet/";
import CDrawer from "@/components/CDrawer/";
import LineDivider from "@/components/LineDivider/";

import Temp1 from "@/components/Temp1/";
import Temp2 from "@/components/Temp2/";
import Temp22 from "@/components/Temp22/";
import TempSignMessage from "@/components/TempSignMessage/";
// import Temp3 from "@/components/Temp3/";
// import Temp4 from "@/components/Temp4/";
// import Temp5 from "@/components/Temp5/";

function Detail() {
  const navigate = useNavigate();

  const [inited, setInited] = useState(false);
  const init = async () => {
    fn()
    // window.solana = new window.hyperPay.solana({
    //   address: "81dLEbVE5JtRo4yAbA2xnoGwZM6WKQ7VtAb2WmTmexM8",
    //   network: "devnet",
    //   isDebug: true
    // });

    // if (window.hyperPay && window.hyperPay.solana) {
    //   // if (!window.hyperPay.solana.isConnected) {
    //   //   console.log("未连接钱包，进行连接");
    //   //   await window.hyperPay.solana.connect();
    //   // }

    //   window.solana = window.hyperPay.solana;

    //   const address = window.hyperPay.solana.publicKey;
    //   console.log("window.hyperPay:", window.hyperPay);
    //   console.log("window.hyperPay.solana:", window.hyperPay.solana);
    //   console.log("钱包地址:", address);
    //   setInited(true);
    // }

    // if (window.hyperPay && window.hyperPay.solana) {
    //   window.solana = window.hyperPay.solana;
    // }
    // let payer = solanaWeb3.Keypair.generate();
    // let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('testnet'));
    //
    // const a = await connection.getAccountInfo(payer.publicKey)
    //
    // if (window.solana) {
    //   console.log(window.solana)
    //   if (!window.solana.isConnected) {
    //     await window.solana.connect();
    //   }
    //   setInited(true);
    // }
  };

  useEffect(() => {
    init();
  }, []);

  const isBegin = true;
  const isConnect = true;
  const hasRanking = true;
  const hasLock = true;
  const isEnd = false;

  const toPage = path => {
    navigate(path);
  };

  const [showLockupModal, setShowLockupModal] = useState(false);
  const handleLockup = () => {
    setShowLockupModal(true);
    // setShowWithdrawModal(true);
    // setShowRedeemModal(true);
  };

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const [showRedeemModal, setShowRedeemModal] = useState(false);

  return (
    <div className="detail-page page">
      {inited && (
        <>
          <Temp1 />
          <Temp2 />
          <Temp22 />
          <TempSignMessage />
          {/* <Temp3 /> */}
          {/* <Temp4 /> */}
          {/* <Temp5 /> */}
        </>
      )}

      <CDrawer
        title="锁仓"
        visible={showLockupModal}
        onClose={() => setShowLockupModal(false)}
      >
        <div className="drawer-lockup-wrap">
          <div className="lockup-info">
            <div className="info-item">
              <div className="label">
                {/* <Input placeholder="请输入锁仓金额" /> */}
                <input type="text" placeholder="请输入锁仓金额" />
              </div>
              <div className="value">
                <img
                  className="icon"
                  src={require("./images/icon-currency.png")}
                  alt=""
                />
                <span className="unit">LARI</span>
              </div>
            </div>
          </div>
          <div className="lockup-tips">
            <div className="label">单笔 1,000 LARI 起投</div>
            <div className="value">
              余额<span className="number">12.223132441</span>APE
            </div>
          </div>
        </div>
        <div className="drawer-bottom-wrap">
          <button className="c-btn" onClick={() => toPage("/lockup-confirm")}>
            确定
          </button>
        </div>
      </CDrawer>

      <CDrawer
        title="提取奖励"
        visible={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
      >
        <div className="drawer-withdraw-wrap">
          <div className="reward-token">
            <img
              className="icon"
              src={require("./images/icon-sol.png")}
              alt=""
            />
            <div className="text">可提取</div>
            <div className="amount">
              <span className="number">1,380,000</span>
              <span className="unit">LARIX</span>
            </div>
          </div>
          <div className="and">+</div>
          <div className="reward-token">
            <img
              className="icon"
              src={require("./images/icon-usdt.png")}
              alt=""
            />
            <div className="text">可提取</div>
            <div className="amount">
              <span className="number">50</span>
              <span className="unit">USDT</span>
            </div>
          </div>
        </div>
        <div className="drawer-bottom-wrap">
          <button className="c-btn" onClick={() => setShowWithdrawModal(false)}>
            确定
          </button>
        </div>
      </CDrawer>

      <CDrawer
        title="赎回"
        visible={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
      >
        <div className="drawer-redeem-wrap">
          <div className="redeem-token">
            <img
              className="icon"
              src={require("./images/icon-sol.png")}
              alt=""
            />
            <div className="text">你将收到</div>
            <div className="amount">
              <span className="number">1,380,000</span>
              <span className="unit">LARIX</span>
            </div>
          </div>
        </div>
        <div className="drawer-bottom-wrap">
          <button className="c-btn" onClick={() => setShowRedeemModal(false)}>
            确定
          </button>
        </div>
      </CDrawer>

      <div className="connect-wallet-wrap">
        <NetworkWallet />
      </div>
      <div className="detail-banner-wrap">
        <img
          className="img-banner"
          src={require("./images/banner.png")}
          alt=""
        />
      </div>

      {isBegin && (
        <div className="total-lock">
          <div className="top">
            <img
              className="icon"
              src={require("./images/icon-amount.png")}
              alt=""
            />
            <span className="text">当前锁仓总额</span>
          </div>
          <div className="bottom">
            <span className="number din-alternate-bold">12,380,00</span>
            <span className="unit">LARIX</span>
          </div>
        </div>
      )}

      {isConnect && (
        <div className="lockup-detail-wrap">
          <div className="lockup-detail">
            <div className="lockup-detail-header">
              <div className="title">我的锁仓详情</div>
              <img
                className="img"
                src={require("./images/img-lockup.png")}
                alt=""
              />
            </div>
            <div className="lockup-detail-content">
              <div className="content-top">
                <div className="top-item">
                  <div className="value">
                    <span className="number">380,000</span>
                    <span className="unit">LARIX</span>
                  </div>
                  <div className="label">我的锁仓总额</div>
                </div>

                <div className="top-row">
                  <div className="top-item">
                    <div className="value">10%</div>
                    <div className="label">我的锁仓总额</div>
                  </div>
                  <div className="top-item">
                    <div className="value">21</div>
                    <div className="label">我的锁仓排行</div>
                  </div>
                </div>

                <div className="top-row">
                  <div className="top-item">
                    <div className="value">
                      <span className="grey">待结算</span>
                    </div>
                    <div className="label">锁仓奖励</div>
                  </div>
                  <div className="top-item">
                    <button className="c-btn c-btn-small">提取</button>
                  </div>
                </div>
              </div>

              {hasLock ? (
                <>
                  <div className="content-item">
                    <div className="item">
                      <div className="value">
                        <span className="number">380,000</span>
                        <span className="unit">LARIX</span>
                      </div>
                      <div className="label">我的锁仓额</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="number">2022-07-01 12:00</span>
                      </div>
                      <div className="label">我的锁仓时间</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="number">2022-07-01 12:00</span>
                      </div>
                      <div className="label">解锁时间</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="text">未解锁</span>
                      </div>
                      <div className="label">状态</div>
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="item">
                      <div className="value">
                        <span className="number">380,000</span>
                        <span className="unit">LARIX</span>
                      </div>
                      <div className="label">我的锁仓额</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="number">2022-07-01 12:00</span>
                      </div>
                      <div className="label">我的锁仓时间</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="number">2022-07-01 12:00</span>
                      </div>
                      <div className="label">解锁时间</div>
                    </div>
                    <div className="item">
                      <div className="value">
                        <span className="text">未解锁</span>
                      </div>
                      <div className="label">状态</div>
                    </div>
                  </div>
                  <div className="content-item">
                    <div className="redeemable-item">
                      <span className="text">可赎回</span>
                      <span className="number">380,000</span>
                      <span className="unit">LARIX</span>
                    </div>
                    <div className="redeemable-item">
                      <button className="c-btn c-btn-small">一键赎回</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="line"></div>
                  <div className="nodata">
                    <img
                      className="img"
                      src={require("./images/img-nodata.png")}
                      alt=""
                    />
                    <div className="text">您还未参与活动</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isBegin && (
        <div className="lock-ranking-wrap">
          <div className="lock-ranking">
            <div className="ranking-header">
              <div className="title">锁仓排行</div>
              <a className="more" href="">
                更多
                <img
                  className="icon"
                  src={require("./images/icon-more.png")}
                  alt=""
                />
              </a>
            </div>
            <div className="ranking-content">
              {hasRanking ? (
                <div className="ranking-list">
                  <div className="ranking-item item-1">
                    <div className="rank-top top-1"></div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>
                  <div className="ranking-item item-2">
                    <div className="rank-top top-2"></div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>
                  <div className="ranking-item item-3">
                    <div className="rank-top top-3"></div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>

                  <div className="ranking-item item-4">
                    <div className="rank-top top-4">4</div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>
                  <div className="ranking-item item-5">
                    <div className="rank-top top-5">5</div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>
                  <div className="ranking-item item-6">
                    <div className="rank-top top-6">6</div>
                    <div className="rank-content">
                      <div className="value">61.68%</div>
                      <div className="address">0x7hifS9Y…HJh3</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="nodata">
                  <img
                    className="img"
                    src={require("./images/img-nodata.png")}
                    alt=""
                  />
                  <div className="text">暂无排行数据</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="detail-info-wrap">
        <div className="info-list">
          <div className="info-item">
            <div className="label">奖池总额</div>
            <div className="content">
              <span className="number din-alternate-bold">380,00</span>
              <span className="unit">LARIX</span>
              <span className="and">+</span>
              <span className="number din-alternate-bold">50</span>
              <span className="unit">USDT</span>
            </div>
          </div>
          <div className="info-item">
            <div className="label">锁仓币种</div>
            <div className="content">
              <img
                className="currency-icon"
                src={require("./images/icon-currency.png")}
                alt=""
              />
              <span className="currency-name">LARIX</span>
              <span className="currency-network">(Solana)</span>
            </div>
          </div>
          <div className="info-item">
            <div className="label">锁仓期限</div>
            <div className="content">
              <span className="day-number din-alternate-bold">10</span>
              <span className="day-text">天</span>
            </div>
          </div>

          <div className="info-item">
            <div className="label">活动开始时间</div>
            <div className="content">
              <span className="date din-alternate-bold">2022-05-21 12:00</span>
            </div>
          </div>
          <div className="info-item">
            <div className="label">活动结束时间</div>
            <div className="content">
              <span className="date din-alternate-bold">2022-06-21 12:00</span>
            </div>
          </div>
          <div className="info-item">
            <div className="label">奖励发放时间</div>
            <div className="content">
              <span className="date din-alternate-bold">2022-06-21 12:00</span>
            </div>
          </div>
          <div className="info-item">
            <div className="label">解锁方式</div>
            <div className="content">
              <span className="text">逐笔到期主动解锁</span>
            </div>
          </div>
        </div>
      </div>
      <LineDivider />
      <div className="rules-wrap">
        <div className="rules-title">活动规则</div>
        <div className="rules-content">
          <p>
            1、用户使用HyperPay
            On-chain钱包参与$LARIX锁仓活动，按锁仓比例瓜分380,000 $LARIX
          </p>
          <p>
            如:同一用户锁仓量(可多次累加)占活动总锁仓量的50%，则可获得190,000LARIX
          </p>
          <p>
            2、锁仓排名前50的地址，根据锁仓量在该50名总锁仓量中的占比，额外瓜分500
            USDT
          </p>
          <p>3、每次最低锁仓数量不低于1,000 $LARIX</p>
          <p>4、用户在募集期间可多次参与锁仓。</p>
          <p>
            5、已参与锁仓的用户，可在募集结束后进入活动页面提取奖励，具体发放时间请参考项目奖励发放时间。
          </p>
          <p>6、请确保您的钱包里要有足够的SOL用于支付GAS费。</p>
        </div>
        <div className="larix-intro">
          <div className="intro-title">
            <img
              className="icon"
              src={require("./images/icon-larix.png")}
              alt=""
            />
            LARIX
          </div>
          <div className="intro-content">
            Larix是Solana公链的终极借贷门户，采用动态利率模型，创建高效的风险管理资金池，在保障资产安全性的前提下被充分使用。除Solana生态的基本借贷外，Larix将支持指数，黄金，美股，NFTs等新型合成资产的抵押和借贷。
            <a className="more" onClick={() => toPage("/introduction")}>
              详情
              <img src={require("./images/icon-arrow-right.png")} alt="" />
            </a>
          </div>
        </div>
      </div>
      <LineDivider />
      <div className="faq-wrap">
        <div className="faq-title">FAQ</div>
        <div className="faq-content">
          <div className="faq-item">
            <div className="item-question">
              <img
                className="icon"
                src={require("./images/icon-question.png")}
                alt=""
              />
              <div className="text">如何参与锁仓，锁仓时间又将如何计算？</div>
            </div>
            <div className="item-ask">
              <img
                className="icon"
                src={require("./images/icon-ask.png")}
                alt=""
              />
              <div className="text">
                活动期间用户可参与锁仓活动，同一地址可进行多次锁仓。活动结束后，关闭矿池，用户无法再进行锁仓。锁仓成功后便开始计算锁仓时间，锁仓周期为10天。同一地址多笔锁仓时，逐笔计算到期时间。锁仓到期后，用户可逐笔提取到期的质押代币，也可以一次性全部解锁取出。
              </div>
            </div>
          </div>
          <div className="faq-item">
            <div className="item-question">
              <img
                className="icon"
                src={require("./images/icon-question.png")}
                alt=""
              />
              <div className="text">锁仓后可提前赎回吗？</div>
            </div>
            <div className="item-ask">
              <img
                className="icon"
                src={require("./images/icon-ask.png")}
                alt=""
              />
              <div className="text">
                一旦锁仓后，无法提前赎回。需锁仓到期后，用户主动解锁赎回。
              </div>
            </div>
          </div>
          <div className="faq-item">
            <div className="item-question">
              <img
                className="icon"
                src={require("./images/icon-question.png")}
                alt=""
              />
              <div className="text">奖金金额如何计算？</div>
            </div>
            <div className="item-ask">
              <img
                className="icon"
                src={require("./images/icon-ask.png")}
                alt=""
              />
              <div className="text">
                Base奖金：根据单个地址的锁仓量占总锁仓量的比例，瓜分Base奖金。
                <br />
                <br />
                例如地址A，共锁仓100个X Token，活动锁仓总量为1,000个X
                Token，活动Base总奖金为500,000 Y Token，则A地址可以领取：500,000
                Y *（100/1,000） = 50,000 个Y Token
                <br />
                <br />
                Extra奖金：另外部分活动会有Extra奖金，奖励给锁仓量排行靠前的地址，根据其锁仓量在规定的TOP名单锁仓量中的占比，额外瓜分Extra奖金。
                <br />
                <br />
                例如地址A，锁仓了100个X Token，前50名地址共锁仓了500个X
                Token，项目的Extra奖金为500U奖励给锁仓量TOP50的用户，,则A地址可以领取的U奖金为：500U
                * (100/500) = 100U
                <br />
                <br />
                备注：单个地址存在多笔锁仓时，以地址为单位自动累计多笔锁仓的数量，以累计总量计算奖金。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-wrap">
        {isBegin ? (
          <button className="c-btn" onClick={() => handleLockup()}>
            去锁仓
          </button>
        ) : isEnd ? (
          <button className="c-btn" disabled>
            活动结束
          </button>
        ) : (
          <button className="c-btn">10天后开始</button>
        )}
      </div>
    </div>
  );
}

export default Detail;
