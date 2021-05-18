import React from "react";
import "./BasicLayout.css";

function BasicLayout(props) {
  const { children } = props;
  
  return (
    <div class="BasicLayout">
      {children}
    </div>
  );
}

export default BasicLayout;