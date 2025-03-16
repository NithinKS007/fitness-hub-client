import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice"
import subscritionReducer from "./subscription/subscriptionSlice"
import userReducer from "./user/userSlice"
import contentReducer from "./content/contentSlice"
import bookingSlotReducer from "./booking/bookingSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["otp","user","admin","trainer"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    admin:adminReducer,
    subscription:subscritionReducer,
    user:userReducer,
    content:contentReducer,
    bookingSlot:bookingSlotReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REMOVE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
