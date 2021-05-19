import React from "react";
import "./BasicLayout.css";

function BasicLayout(props) {
  const { children } = props;
  
  return (
    <div className="BasicLayout">
      {children}
    </div>
  );
}

export default BasicLayout;