import { IPokemon } from "../../../components/Card/types";

export interface IPokemonsInitialState {
  filteredPokemonsList: IPokemon[] | [];
  pokemons: {
    data: {
      totalPages: number;
      results: IPokemon[] | [];
      filters: {
        limit: number;
        sortMethod: string;
        currentPage: number;
        searchInput: string;
        selectedType: string;
      };
    };
    loading: boolean;
    error: null | string;
  };
  pokemon: {
    loading: boolean;
    error: null | string;
    data: IPokemon | null;
    category: {
      category: null,
      loading: boolean,
      error: null,
      }
      evoluations: {
        data: any,
        loading: boolean,
        error: null,
        }
  };

}




