'use client'

import { useEffect } from "react";
import { AppDispatch } from "../provider/store";
import DropDown from "../components/DropDown";
import { IPokemon } from "../components/Card/types";
import { useDispatch, useSelector } from "react-redux";
import { pokemonsSel, pokemonsOp } from "../provider/store/pokemons";
import { fetchPokemonsList } from "../provider/store/pokemons/thunks";
import { Card, Heading, Pagination, SearchInput, Sceleton } from "../components";

import styles from "./page.module.scss";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const limit = useSelector(pokemonsSel.pokemonsLimitSelector);
  const filteredPokemonsList = useSelector(
    pokemonsSel.filteredPokemonsListSelector
  );
  const pokemonsLoader = useSelector(pokemonsSel.pokemonsLoaderSelector)
  const pokemonsList = useSelector(pokemonsSel.pokemonsListSelector);
  const selectedType = useSelector(pokemonsSel.pokemonsTypeSelector);
  const sortMethod = useSelector(pokemonsSel.pokemonsSortMethodSelector);
  const searchInput = useSelector(
    pokemonsSel.pokemonsSearchInputSelector
  ).toLowerCase();
  const currentPage = useSelector(pokemonsSel.pokemonsCurrentPageSelector);

  useEffect(() => {
    dispatch(fetchPokemonsList(selectedType));
  }, [dispatch, selectedType]);

  useEffect(() => {
    dispatch(
      pokemonsOp.setFilteredPokemonsList(
        pokemonsList
          .filter((pokemon: IPokemon) =>
            pokemon.name.toLowerCase().includes(searchInput)
          )
      )
    );
  }, [pokemonsList, currentPage, searchInput, limit]);

  const handleSortMethodClick = (pokemonsList: IPokemon[], option: string) => {
    dispatch(pokemonsOp.sortPokemonsList(pokemonsList, option));
    dispatch(pokemonsOp.setCurrentPage(1));
  };

  const handleTypeClick = (pokemonsList: IPokemon[], option: string) => {
    dispatch(pokemonsOp.setType(option));
    dispatch(pokemonsOp.setCurrentPage(1));
  };

  const handleLimitClick = (pokemonsList: IPokemon[], option: string) => {
    dispatch(pokemonsOp.setCurrentPage(1));
    dispatch(pokemonsOp.setLimit(Number(option)));
    window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: number) => {
    dispatch(pokemonsOp.setCurrentPage(page));
  };

  const pokemonsListRenderer = filteredPokemonsList.slice(
    currentPage === 1 ? 0 : currentPage * limit,
    currentPage === 1 ? limit : currentPage * limit + limit
  ).map((pokemon:any) => (
    pokemonsLoader ? <Sceleton width="250px" height="350px" key={pokemon.id}/>:<Card pokemon={pokemon} key={pokemon.id} />
  ));


  return (
    <section className={styles.wrapper}>
      <Heading>Pokédex</Heading>
      <div className={styles.wrapper__firstSection}>
        <SearchInput />
        <DropDown
          options={[
            "A to Z",
            "Z to A",
            "Lowest to Highest",
            "Highest to Lowest",
          ]}
          handleClick={handleSortMethodClick}
          selectedOption= {sortMethod}
          initialActiveOption={sortMethod}
        />
        <DropDown
          options={[
            "All Types",
            "fighting",
            "poison",
            "rock",
            "ghost",
            "fire",
            "grass",
            "psychic",
            "dragon",
            "fairy",
            "normal",
            "flying",
            "ground",
            "bug",
            "steel",
            "water",
            "electric",
            "ice",
            "dark",
            "shadow",
          ]}
          handleClick={handleTypeClick}
          selectedOption= {selectedType}
          initialActiveOption={selectedType}
        />
        <DropDown
          options={["10", "20", "50"]}
          handleClick={handleLimitClick}
          selectedOption={limit.toString()}
          initialActiveOption= {limit.toString()}
        />
      </div>
      <div className={styles.pokemonsList}>{pokemonsListRenderer}</div>
      <Pagination
        totalItems={filteredPokemonsList.length}
        itemsPerPage={limit}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </section>
  );
};

export default Home;
