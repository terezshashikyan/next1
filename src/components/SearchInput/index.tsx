import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { AppDispatch } from "../../provider/store";
import { useDispatch, useSelector } from "react-redux";
import { pokemonsOp, pokemonsSel } from "../../provider/store/pokemons";

import styles from "./SearchInput.module.scss";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchInput = useSelector(pokemonsSel.pokemonsSearchInputSelector);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(pokemonsOp.setSearchInput(event.target.value));
  };

  return (
    <div className={styles.wrapper}>
    <input
    className={styles.wrapper__input}
    type="text"
    placeholder="Search..."
    value={searchInput}
    onChange={handleSearchInputChange}
    />
    <CiSearch className={styles.wrapper__searchIcon}/>
    </div>
    
  );
};

export default SearchInput;
