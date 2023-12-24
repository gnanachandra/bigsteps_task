/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import { successToast } from "../../utils/toastHelper";

const initialState = {
  isLoading: true,
  totalCount: 0,
  presentCount: 0,
  pokemons: [],
  pokemon: {},
};

export const getPokemonData = createAsyncThunk(
  "/pokemon(get)",
  async (payload, { getState, rejectWithValue }) => {
    const state = getState();
    const nextRequest = state.pokemon.next;
    console.log(nextRequest)
    try {
      const response = await axios.get(nextRequest);
      const { results, count, next } = response.data;
      console.log("Results : ", results);
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

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemonData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPokemonData.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.totalCount = payload.count;
      state.pokemons = state.pokemons.concat(payload.pokemonDetails);
      state.presentCount = state.pokemons.length;
      state.next = payload.next;
      console.log("Present pokemons:", state.pokemons);
      successToast(state.presentCount)
    });
    builder.addCase(getPokemonData.rejected, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.errorMessage = payload?.message;
      toast.error(payload?.message || "Something went wrong");
    });
  },
});

export default pokemonSlice.reducer;
