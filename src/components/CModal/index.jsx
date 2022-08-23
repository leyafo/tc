import React from "react";
import { Modal } from "antd";

import "./index.scss";

function CModal({ visible, onOk, onCancel, children }) {
  return (
    <Modal
      width={"5.4rem"}
      visible={visible}
      closable={false}
      footer={null}
      onOk={onOk}
      onCancel={onCancel}
      wrapClassName="c-modal"
    >
      {children}
    </Modal>
  );
}

export default CModal;
