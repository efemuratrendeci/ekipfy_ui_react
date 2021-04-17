import React from "react";

import Body from "./Body"
import Header from "./Header";

const Main = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Body />
    </>
  );
};

export default Main;
