import { AuthContextProvider } from "./AuthContext";
import { CarContextProvider } from "./CarContext";
import { BookingContextProvider } from "./BookingContext";
import { PaymentContextProvider } from "./PaymentContext";

export const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <CarContextProvider>
        <BookingContextProvider>
          <PaymentContextProvider>{children}</PaymentContextProvider>
        </BookingContextProvider>
      </CarContextProvider>
    </AuthContextProvider>
  );
};
export default AppContextProvider;
