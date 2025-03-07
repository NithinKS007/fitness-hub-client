import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const STRIPE_PUBLISHABLE_KEY = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string)

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <Elements stripe={STRIPE_PUBLISHABLE_KEY}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ToastContainer theme="dark" />
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
    </Elements>
  </StrictMode>
);
