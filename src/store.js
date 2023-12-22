import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./redux/pokemon/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;
