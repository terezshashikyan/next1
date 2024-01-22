import { RootState } from "..";
import { createSelector } from "reselect";
import { IPokemonsInitialState } from "./types";

const pokemonsSelector = (state: RootState) => state.pokemons;

const pokemonsListSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemons.data.results
);

const pokemonsLoaderSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemons.loading
);

const pokemonSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemon.data
);

const pokemonLoaderSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemon.loading
);

const filteredPokemonsListSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.filteredPokemonsList
);

const pokemonsCurrentPageSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) =>
    pokemons.pokemons.data.filters.currentPage
);

const pokemonsLimitSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemons.data.filters.limit
);

const pokemonsTypeSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) =>
    pokemons.pokemons.data.filters.selectedType
);

const pokemonsSortMethodSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemons.data.filters.sortMethod
);

const pokemonsSearchInputSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) =>
    pokemons.pokemons.data.filters.searchInput
);

const pokemonCategorySelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemon.category.category
);

const pokemonEvoluationsSelector = createSelector(
  [pokemonsSelector],
  (pokemons: IPokemonsInitialState) => pokemons.pokemon.evoluations.data
);

export const pokemonsSel = {
  pokemonsSelector,
  pokemonSelector,
  pokemonsTypeSelector,
  pokemonsListSelector,
  pokemonsLimitSelector,
  pokemonLoaderSelector,
  pokemonsLoaderSelector,
  pokemonCategorySelector,
  pokemonsSortMethodSelector,
  pokemonEvoluationsSelector,
  pokemonsSearchInputSelector,
  pokemonsCurrentPageSelector,
  filteredPokemonsListSelector,
};
