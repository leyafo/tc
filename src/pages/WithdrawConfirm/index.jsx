import React, { useState } from "react";
import { Input } from "antd";

import "./index.scss";
import CModal from "@/components/CModal/";

function LockupConfirm() {
  const [showWallPasswordModal, setShowWallPasswordModal] = useState(false);
  const onCancel = () => {
    setShowWallPasswordModal(false);
  };
  return (
    <div className="lockup-confirm-page page">
      <CModal visible={showWallPasswordModal} onCancel={onCancel}>
        <div className="wallet-password-modal">
          <div className="modal-title">输入钱包密码</div>
          <div className="modal-content">
            <Input.Password placeholder="输入交易密码" />
          </div>
          <div className="modal-bottom">
            <button className="btn-cancel">取消</button>
            <button className="btn-ok">确定</button>
          </div>
        </div>
      </CModal>
      <div className="lockup-info">
        <div className="info-item">
          <div className="step-item">
            <div className="label">锁仓金额</div>
            <div className="value">
              <div className="text">TG39ifS9YBkE890HJO098gRFDR90865F</div>
            </div>
          </div>
          <div className="step-item">
            <div className="label">锁仓金额</div>
            <div className="value">
              <div className="text">TG39ifS9YBkE890HJO098gRFDR90865F</div>
            </div>
          </div>
        </div>

        <div className="info-item">
          <div className="label">执行操作</div>
          <div className="value">
            <div className="top">
              <div className="text">Claim rewards</div>
            </div>
          </div>
        </div>

        <div className="info-item">
          <div className="label">矿工费</div>
          <div className="value">
            <div className="top">
              <div className="fee">0.00246 ETH ≈ ￥8.01</div>
              <i className="icon-arrow"></i>
            </div>
            <div className="tips">预计30min到账</div>
          </div>
        </div>
      </div>
      <div className="btn-wrap">
        <button
          className="c-btn"
          onClick={() => setShowWallPasswordModal(true)}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default LockupConfirm;
