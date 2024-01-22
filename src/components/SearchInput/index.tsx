import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import styles from "./SearchInput.module.scss";
import { pokemonsOp, pokemonsSel } from "../../provider/store/pokemons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../provider/store";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchInput = useSelector(pokemonsSel.pokemonsSearchInputSelector);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(pokemonsOp.setSearchInput(event.target.value));
  };

  return (
    <input
      className={styles.wrapper__input}
      type="text"
      placeholder="Search..."
      value={searchInput}
      onChange={handleSearchInputChange}
    />
  );
};

export default SearchInput;
