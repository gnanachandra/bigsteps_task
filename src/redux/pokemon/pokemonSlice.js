/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { successToast } from "../../utils/toastHelper";

const initialState = {
  isLoading: true,
  totalCount: 0,
  pokemons: [],
  pokemon: {},
};

export const getPokemonData = createAsyncThunk(
  "/pokemon(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${payload.limit}$offset=${payload.offset}`
      );
      const { results, count } = response.data;

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        })
      );

      return { pokemonDetails, count };
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemonData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPokemonData.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.isLoading = false;
      state.totalCount = payload.count;
      state.pokemons = [...state.pokemons, ...payload.pokemonDetails];
      // successToast("pokemon data fetched")
    });
    builder.addCase(getPokemonData.rejected, (state, { payload }) => {
      console.log(payload)
      state.isLoading = false;
      state.errorMessage = payload?.message;
      toast.error(payload?.message || "Something went wrong");
    });
  },
});

export default pokemonSlice.reducer;
