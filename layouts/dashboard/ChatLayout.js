// import node module libraries
import React, { useState } from "react";

// import sub components
import Vertical from "./s/Vertical";
import Top from "./s/Top";

const DashboardIndex = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  return (
    <section
      id="db-wrapper"
      className={`chat-layout px-0 ${showMenu ? "" : "toggled"}`}
    >
      <div className="-vertical ">
        <Vertical showMenu={showMenu} onClick={(value) => setShowMenu(value)} />
      </div>
      <div id="page-content">
        <div className="header">
          <Top
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        <div className="container-fluid p-0">{props.children}</div>
      </div>
    </section>
  );
};
export default DashboardIndex;
