import React from "react";

import Body from "./Body"
import Header from "./Header";

const Main = ({ user, theme, themePref }) => {
  return (
    <>
      <Header user={user} theme={theme} themePref={themePref} />
      <Body />
    </>
  );
};

export default Main;
