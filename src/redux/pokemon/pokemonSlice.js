/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { successToast } from "../../utils/toastHelper";

const initialState = {
  isLoading: true,
  totalCount: 0,
  next: "https://pokeapi.co/api/v2/pokemon",
  presentCount: 0,
  pokemons: [],
  pokemon: {},
  pokemonTypes: [],
};

export const getPokemonData = createAsyncThunk(
  "/pokemon(get)",
  async (payload, { getState, rejectWithValue }) => {
    const state = getState();
    const nextRequest = state.pokemon.next;

    try {
      const response = await axios.get(nextRequest);
      const { results, count, next } = response.data;

      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        })
      );

      return { pokemonDetails, count, next };
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getPokemonTypes = createAsyncThunk(
  "/pokemonTypes(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");

      return response.data.results;
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
      state.isLoading = false;
      state.totalCount = payload.count;
      state.pokemons = state.pokemons.concat(payload.pokemonDetails);
      state.presentCount = state.pokemons.length;
      state.next = payload.next;
    });
    builder.addCase(getPokemonData.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.message;
      toast.error(payload?.message || "Something went wrong");
    });

    builder.addCase(getPokemonTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPokemonTypes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.pokemonTypes = payload;
      state.pokemonTypes.unshift({name : "all"});
    });
    builder.addCase(getPokemonTypes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload?.message;
      toast.error(payload?.message || "unable to get pokemon types");
    });
  },
});

export default pokemonSlice.reducer;
