import React, { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext("");
export const AlertDialogContext = createContext(null);

function Contexts({ children }) {
  const [searchFor, setSearchFor] = useState("");
  const [alertDialog, setAlertDialog] = useState(false);

  return (
    <AlertDialogContext.Provider value={{ alertDialog, setAlertDialog }}>
      <SearchContext.Provider value={{ searchFor, setSearchFor }}>
        {children}
      </SearchContext.Provider>
    </AlertDialogContext.Provider>
  );
}

export default Contexts;
