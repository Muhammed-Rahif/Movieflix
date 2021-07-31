import React, { useState } from "react";
import { createContext } from "react";

export const NavigationIndexContext = createContext(0);
export const SearchContext = createContext("");
export const AlertDialogContext = createContext(null);
export const ViewModalMovieContext = createContext(false);

function Contexts({ children }) {
  const [searchFor, setSearchFor] = useState("");
  const [alertDialog, setAlertDialog] = useState(false);
  const [navigationIndex, setNavigationIndex] = useState(0);
  const [viewMovieModal, setViewMovieModal] = useState({ open: false });

  return (
    <NavigationIndexContext.Provider
      value={{ navigationIndex, setNavigationIndex }}
    >
      <AlertDialogContext.Provider value={{ alertDialog, setAlertDialog }}>
        <ViewModalMovieContext.Provider
          value={{ viewMovieModal, setViewMovieModal }}
        >
          <SearchContext.Provider value={{ searchFor, setSearchFor }}>
            {children}
          </SearchContext.Provider>
        </ViewModalMovieContext.Provider>
      </AlertDialogContext.Provider>
    </NavigationIndexContext.Provider>
  );
}

export default Contexts;
