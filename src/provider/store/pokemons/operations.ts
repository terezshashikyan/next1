'use client'

import { AppDispatch } from "..";
import { pokemonsSlice, setSortMethod } from "./pokemonsSlice";
import { IPokemon } from "../../../components/Card/types";

const setCurrentPage = (page: number) => {
  const { setCurrentPage } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    dispatch(setCurrentPage(page));
  };
};

const setType = (type: string) => {
  const { setType } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    dispatch(setType(type));
  };
};

const setSearchInput = (searchInput: string) => {
  const { setSearchInput } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    dispatch(setSearchInput(searchInput));
  };
};

const setFilteredPokemonsList= (pokemonsList:IPokemon[]) => {
  const { setFilteredPokemonsList } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    dispatch(setFilteredPokemonsList(pokemonsList));
  };
};

const setLimit = (limit: string | number) => {
  const { setLimit } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    dispatch(setLimit(Number(limit)));
  };
};

const sortPokemonsList = (pokemonsList: IPokemon[], sortMethod: string) => {
  const { setPokemonsList } = pokemonsSlice.actions;
  return (dispatch: AppDispatch) => {
    let sortedPokemonsList;

    switch (sortMethod) {
      case "A to Z":
        sortedPokemonsList = [...pokemonsList].sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        );
        break;
      case "Z to A":
        sortedPokemonsList = [...pokemonsList].sort((a, b) =>
          b.name.localeCompare(a.name, "en", { sensitivity: "base" })
        );
        break;
      case "Lowest to Highest":
        sortedPokemonsList = [...pokemonsList].sort((a, b) => a.id - b.id);
        break;
      case "Highest to Lowest":
        sortedPokemonsList = [...pokemonsList].sort((a, b) => b.id - a.id);
        break;
      default:
        sortedPokemonsList = [...pokemonsList].sort((a, b) => b.id - a.id);
        break;
    }


    dispatch(setPokemonsList(sortedPokemonsList));
    dispatch(setSortMethod(sortMethod));
  };
};



export const pokemonsOp = {
  setType,
  setLimit, 
  setSearchInput,
  setCurrentPage,
  sortPokemonsList,
  setFilteredPokemonsList
};
