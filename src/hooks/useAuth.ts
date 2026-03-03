import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth hookia täytyy käyttää AuthProviderin sisällä");
  }

  return context;
};
