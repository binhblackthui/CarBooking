import { useState, useEffect, createContext } from "react";
import { authService } from "../services/authService.js";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginUser = async (userForm) => {
    try {
      const response = await authService.login(userForm);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      loadingUser();
    }
  };

  const loadingUser = async () => {
    try {
      const response = await authService.loadUser();
      return response;
    } catch (error) {
      console.error("Loading user error:", error);
    } finally {
      setLoading(false);
    }
  };
  const logoutUser = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadingUser();
  }, []);
  const authContextData = {
    isAuthenticated,
    user,
    loading,
    loginUser,
    logoutUser,
    loadingUser,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
