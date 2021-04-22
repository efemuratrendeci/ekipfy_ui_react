import React from "react";

import Body from "./Body"
import Header from "./Header";

const Main = ({ user, theme, themePref, socket }) => {
  return (
    <>
      <Header user={user} theme={theme} themePref={themePref} />
      <Body socket={socket} user={user} />
    </>
  );
};

export default Main;
