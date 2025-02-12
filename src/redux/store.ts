import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["otp","user"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    admin:adminReducer
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
