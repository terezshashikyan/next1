import { combineReducers } from "@reduxjs/toolkit";

import { pokemonsSlice } from "./pokemons";

export const reducers = () =>
  combineReducers({
    pokemons: pokemonsSlice.reducer,
  });
