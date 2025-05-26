import React from "react";

const ContextProvider = ({ children }) => {
  const [bookDetail, setBookDetail] = React.useState(null);
  return (
    <bookDetailContext.Provider value={{ bookDetail, setBookDetail }}>
      {children}
    </bookDetailContext.Provider>
  );
};

export default ContextProvider;
