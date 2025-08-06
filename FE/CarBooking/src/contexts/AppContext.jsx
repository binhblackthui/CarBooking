import { AuthContextProvider } from "./AuthContext";
import { CarContextProvider } from "./CarContext";
import { BookingContextProvider } from "./BookingContext";

export const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <CarContextProvider>
        <BookingContextProvider>{children}</BookingContextProvider>
      </CarContextProvider>
    </AuthContextProvider>
  );
};
export default AppContextProvider;
