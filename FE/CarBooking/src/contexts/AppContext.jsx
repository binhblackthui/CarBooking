import { AuthContextProvider } from "./AuthContext";

export const AppProvider = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
