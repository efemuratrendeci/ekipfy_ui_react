import React from "react";

import Header from "../components/Header"
import Body from "../components/Body"

const Main = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Body />
    </>
  );
};

export default Main;
