import { AuthContextProvider } from "./AuthContext";

export const AppContextProvider = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
export default AppContextProvider;
