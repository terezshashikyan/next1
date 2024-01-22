'use client'

import { useEffect, useRef, useState } from "react";

import { IDropdownProps } from "./types";
import { IPokemon } from "../Card/types";
import { useSelector } from "react-redux";
import { pokemonsSel } from "../../provider/store/pokemons";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

import styles from "./DropDown.module.scss";

const DropDown: React.FC<IDropdownProps> = ({
  options,
  handleClick,
  selectedOption,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pokemonsList = useSelector(pokemonsSel.pokemonsListSelector);


  const handleClose = (event: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, []);

  const handleOptionClick = (pokemonsList: IPokemon[], option: string) => {
    setIsOpen(false);
    handleClick(pokemonsList, option);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.dropdown__header}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        {isOpen ? <BsCaretUpFill/> : <BsCaretDownFill/>}

      </div>
      {isOpen && (
        <ul className={styles.dropdown__body}>
          {options.map((option: string) => (
            <li
              key={option}
              className={styles.dropdown__option}
              onClick={() => handleOptionClick(pokemonsList, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
