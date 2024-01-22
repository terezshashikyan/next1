"use client";

import { useEffect } from "react";
import { AppDispatch } from "../../provider/store";
import { useDispatch, useSelector } from "react-redux";
import { pokemonsSel } from "../../provider/store/pokemons";
import { Heading, Evaluator, Card, Loading } from "../../components";

import styles from "./PokemonPage.module.scss";
import ImageHolder from "../../components/ImageHolder";
import {
  fetchPokemon,
  fetchCategory,
  fetchPokemonEvolutions,
} from "../../provider/store/pokemons/thunks";

const PokemonPage = ({ params }: { params: any }) => {
  const { id } = params;
  const dispatch = useDispatch<AppDispatch>();
  const pokemon = useSelector(pokemonsSel.pokemonSelector);
  const pokemonLoader = useSelector(pokemonsSel.pokemonLoaderSelector);
  const category = useSelector(pokemonsSel.pokemonCategorySelector);
  const evoluations = useSelector(pokemonsSel.pokemonEvoluationsSelector);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemon(Number(id)));
      dispatch(fetchCategory(Number(id)));
      dispatch(
        fetchPokemonEvolutions(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        )
      );
    }
  }, [dispatch, id]);

  const statsRenderer = pokemon?.stats.map((stat: any) => (
    <div className={styles.stat} key={stat.stat.name}>
      <p className={styles.wrapper__main__details__detail_light}>
        {stat.stat.name}
      </p>
      <Evaluator rating={stat.effort} />
    </div>
  ));

  const evoluationsRenderer = evoluations.map((evolution: any) =>
    evolution.evolvesTo.map((ev: any) => <Card pokemon={ev} key={ev.id} />)
  );

  if (pokemonLoader) {
    return <Loading />;
  }

  return (
    <section className={styles.wrapper}>
      <a href="./" className={styles.wrapper__a}>
        &#8249; Explore more Pokémon
      </a>
      <Heading>{`#${pokemon?.id} ${pokemon?.name}`}</Heading>
      <div className={styles.wrapper__main}>
        <ImageHolder
          src={pokemon?.sprites.other.dream_world.front_default}
          alt="pokemon"
          className={styles.wrapper__main__img}
        />
        <div className={styles.wrapper__main__details}>
          <div className={styles.wrapper__main__details__detail}>
            <span className={styles.wrapper__main__details__detail_bold}>
              Height
            </span>
            <span className={styles.wrapper__main__details__detail_light}>
              {pokemon?.height}
            </span>
          </div>
          <div className={styles.wrapper__main__details__detail}>
            <span className={styles.wrapper__main__details__detail_bold}>
              Weight
            </span>
            <span className={styles.wrapper__main__details__detail_light}>
              {pokemon?.weight}
            </span>
          </div>
          <div className={styles.wrapper__main__details__detail}>
            <span className={styles.wrapper__main__details__detail_bold}>
              Category
            </span>
            <span className={styles.wrapper__main__details__detail_light}>
              {category}
            </span>
          </div>
          <div className={styles.wrapper__main__details__detail}>
            <span className={styles.wrapper__main__details__detail_bold}>
              Types
            </span>
            {pokemon?.types.map((type: any) => (
              <span
                key={type.type.name}
                className={styles.wrapper__main__details__detail_light}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className={styles.wrapper__main__details__detail}>
            <span className={styles.wrapper__main__details__detail_bold}>
              Ability
            </span>
            {pokemon?.abilities.map((ability: any) => (
              <span
                key={ability.ability.name}
                className={styles.wrapper__main__details__detail_light}
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.wrapper__stats}>
        <span className={styles.wrapper__main__details__detail_bold}>
          Stats
        </span>
        <div className={styles.wrapper__stats__container}>{statsRenderer}</div>
      </div>
      <div className={styles.wrapper__evoluations}>
        <span className={styles.wrapper__main__details__detail_bold}>
          Evoluations
        </span>
        <div className={styles.wrapper__evoluations__container}>
          {evoluationsRenderer}
        </div>
      </div>
    </section>
  );
};

export default PokemonPage;

