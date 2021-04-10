import React from "react";

import NavigationButton from "./NavigationButton"
import Body from "./Body"
import Header from "./Header"

const Main = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Body />
      <NavigationButton user={user} />
    </>
  );
};

export default Main;
