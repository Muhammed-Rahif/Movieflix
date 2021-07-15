import React, { useState } from "react";
import { createContext } from "react";

export const NavigationIndexContext = createContext(0);
export const SearchContext = createContext("");
export const AlertDialogContext = createContext(null);

function Contexts({ children }) {
  const [searchFor, setSearchFor] = useState("");
  const [alertDialog, setAlertDialog] = useState(false);
  const [navigationIndex, setNavigationIndex] = useState(0);

  return (
    <NavigationIndexContext.Provider
      value={{ navigationIndex, setNavigationIndex }}
    >
      <AlertDialogContext.Provider value={{ alertDialog, setAlertDialog }}>
        <SearchContext.Provider value={{ searchFor, setSearchFor }}>
          {children}
        </SearchContext.Provider>
      </AlertDialogContext.Provider>
    </NavigationIndexContext.Provider>
  );
}

export default Contexts;
