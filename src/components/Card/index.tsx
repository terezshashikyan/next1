import { ICardProps } from "./types";
import { useRouter } from 'next/navigation';

import styles from "./Card.module.scss";

const Card: React.FC<ICardProps> = ({ pokemon }) => {
  // console.log(pokemon.sprites.other.dream_world.front_default, "jjj");
  const router = useRouter();
  function handleClick() {
    router.push(`/${pokemon.id}`); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <figure
      className={styles.wrapper}
      onClick={handleClick}
    >
      <img
        className={styles.img}
        src={pokemon.sprites.other.dream_world.front_default}
        alt="pokemon"
      />
      <p className={styles.primaryText}>{pokemon.name}</p>
      <p className={styles.secondaryText}>#{pokemon.id}</p>
      <p className={styles.secondaryText}>
        {pokemon.types.map((typeObject) => (
          <span key = {typeObject.type.name}>{typeObject.type.name} </span>
        ))}
      </p>
    </figure>
  );
};

export default Card;
