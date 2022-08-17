import React, { useState } from "react";
import { Drawer } from "antd";

import "./index.scss";

function CDrawer({ title, visible, onClose, children }) {
  return (
    <Drawer
      placement="bottom"
      height={"auto"}
      visible={visible}
      mask={true}
      closable={false}
      onClose={onClose}
      className="c-drawer"
    >
      <div className="drawer-title">
        {title}
        <i className="drawer-close" onClick={onClose}></i>
      </div>
      <div className="drawer-content">{children}</div>
    </Drawer>
  );
}

export default CDrawer;
