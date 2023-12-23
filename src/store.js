import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./redux/pokemon/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
