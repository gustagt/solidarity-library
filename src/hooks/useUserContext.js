import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.log("Contexto não encontrado.");
  }

  return context;
};
