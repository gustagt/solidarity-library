import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

  

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-library-solidary"))
  );

 


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
