import React from "react";

import Body from "./Body"
import Header from "./Header";

const Main = ({ user, theme, themePref, socket, verifyJWT }) => {
  return (
    <>
      <Header user={user} theme={theme} themePref={themePref} verifyJWT={verifyJWT} />
      <Body socket={socket} user={user} />
    </>
  );
};

export default Main;
