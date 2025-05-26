import React from "react";
import bookDetailContext from "./bookDetailContext";

const ContextProvider = ({ children }) => {
  const [bookDetail, setBookDetail] = React.useState({});
  return (
    <bookDetailContext.Provider value={{ bookDetail, setBookDetail }}>
      {children}
    </bookDetailContext.Provider>
  );
};

export default ContextProvider;
