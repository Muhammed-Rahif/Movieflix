import React, { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext("");

function Contexts({ children }) {
  const [searchFor, setSearchFor] = useState("");

  return (
    <SearchContext.Provider value={{ searchFor, setSearchFor }}>
      {children}
    </SearchContext.Provider>
  );
}

export default Contexts;
