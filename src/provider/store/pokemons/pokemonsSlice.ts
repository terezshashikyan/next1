'use client'

import {
  fetchCategory,
  fetchPokemonEvolutions,
  fetchPokemonsList,
  fetchPokemon,
} from "./thunks";
import { initialState } from "./initialState";
import { IPokemonsInitialState } from "./types";
import { IPokemon } from "../../../components/Card/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: initialState,
  reducers: {
    setSearchInput(state, action: PayloadAction<string>) {
      state.pokemons.data.filters.searchInput = action.payload;
    },
    setFilteredPokemonsList(state, action: PayloadAction<IPokemon[]>) {
      state.filteredPokemonsList = action.payload;
    },
    setPokemonsList(
      state: IPokemonsInitialState,
      action: PayloadAction<IPokemon[]>
    ) {
      state.pokemons.data.results = action.payload;
    },
    setSortMethod: (state, action: PayloadAction<string>) => {
      state.pokemons.data.filters.sortMethod = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.pokemons.data.filters.selectedType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pokemons.data.filters.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pokemons.data.filters.limit = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsList.pending, (state) => {
        state.pokemons.loading = true;
        state.pokemons.error = null;
      })
      .addCase(fetchPokemonsList.fulfilled, (state, action: any) => {
        state.pokemons.loading = false;
        state.pokemons.data.results = action.payload.results;
        state.pokemons.data.totalPages = Math.ceil(
          action.payload.count / action.payload.results.length
        );
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.pokemon.loading = true;
        state.pokemon.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action: PayloadAction<any>) => {
        state.pokemon.loading = false;
        state.pokemon.data = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action: PayloadAction<any>) => {
        state.pokemon.loading = false;
        state.pokemon.error = action.payload;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.pokemon.category.loading = true;
        state.pokemon.category.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.pokemon.category.loading = false;
        state.pokemon.category.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action: PayloadAction<any>) => {
        state.pokemon.category.loading = false;
        state.pokemon.category.error = action.payload;
      })
      .addCase(fetchPokemonEvolutions.pending, (state) => {
        state.pokemon.evoluations.loading = true;
        state.pokemon.evoluations.error = null;
      })
      .addCase(
        fetchPokemonEvolutions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.pokemon.evoluations.loading = false;
          state.pokemon.evoluations.data = action.payload;
        }
      );
  },
});

export const {
  setPokemonsList,
  setType,
  setSortMethod,
  setLimit,
  setFilteredPokemonsList,
} = pokemonsSlice.actions;
