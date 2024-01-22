import { IPokemonsInitialState } from "./types";

export const initialState: IPokemonsInitialState = {
  filteredPokemonsList: [],
  pokemons: {
    data: {
      results: [],
      totalPages: 0,
      filters: {
        limit: 10,
        currentPage: 1,
        searchInput: '',
        sortMethod: "A to Z",
        selectedType: "fire",
      },
    },
    error: null,
    loading: true,
  },
  pokemon: {
    data: null,
    error: null,
    loading: false,
    category: {
      category: null,
      loading: true,
      error: null,
      },
      evoluations: {
        data: [],
        loading: false,
        error: null,
        }
  },
};
