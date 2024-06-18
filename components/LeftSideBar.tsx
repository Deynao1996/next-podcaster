import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const LeftSideBar = () => {
  return (
    <div className="sticky left-0 top-0">
      <div className="p-8">
        <Logo iconHeight={27} iconWidth={23} />
      </div>
      <div className="mt-12">
        <NavLinks />
      </div>
    </div>
  );
};

export default LeftSideBar;
