/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const [user, setUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const value = {
    isAuthed,
    setIsAuthed,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
