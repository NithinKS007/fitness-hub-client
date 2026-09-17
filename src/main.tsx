import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LoadingSpinner from "./components/LoadingSpinner.js";
import { SocketProvider } from "./context/SocketContext.js";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const STRIPE_PUBLISHABLE_KEY = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Elements stripe={STRIPE_PUBLISHABLE_KEY}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate
            loading={<LoadingSpinner size={60} thickness={4} />}
            persistor={persistor}
          >
            <SocketProvider>
              <BrowserRouter>
                <Toaster position="top-center" reverseOrder={false} />
                <App />
              </BrowserRouter>
            </SocketProvider>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </Elements>
  </StrictMode>
);
