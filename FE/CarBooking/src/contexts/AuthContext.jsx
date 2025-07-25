import { useEffect, createContext, useReducer } from "react";
import { authService } from "../services/authService.js";
import authReducer, {
  initialAuthState,
  authActions,
} from "../features/AuthSlice.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  const navigate = useNavigate();
  const login = async (loginForm) => {
    dispatch(authActions.setLoading());
    try {
      const response = await authService.login(loginForm);

      if (response.statusCode === 200) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
      return response;
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      loadingUser();
    }
  };
  const loadingUser = async () => {
    dispatch(authActions.setLoading());
    try {
      const user = await authService.loadUser();
      dispatch(authActions.setAuth({ user }));
      return user;
    } catch (error) {
      dispatch(authActions.setAuth({ user: null }));
      throw error;
    }
  };
  const register = async (userData) => {
    dispatch(authActions.setLoading());
    try {
      const response = await authService.register(userData);
      toast.success("Successful! Please log in.");
      if (response.statusCode === 201) {
        toast.success("Registration successful! Please log in.");
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
      }

      return response;
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      dispatch(authActions.setAuth({ user: null }));
    }
  };
  const logout = async () => {
    await authService.logout();
    dispatch(authActions.setLogout());
    navigate("/");
  };

  useEffect(() => {
    loadingUser();
  }, []);

  const authContextData = {
    authState,
    login,
    loadingUser,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
