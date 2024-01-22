export interface IPokemon {
  name: string;
  image: string;
  forms: { name: string; url: string }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  game_indices: {
    game_index: number;
    version: { name: string; url: string };
  }[];
  height: number;
  held_items:
    | {
        item: { name: string; url: string };
        version_details: {
          rarity: number;
          version: { name: string; url: string };
        };
      }[]
    | [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves:
    | {
        move: { name: string; url: string };
        version_group_details: {
          level_learned_at: number;
          move_learn_method: { name: string; url: string };
          version_group: { name: string; url: string };
        };
      }[]
    | [];
  order: number;
  past_abilites: [];
  past_types: [];
  species: { name: string; url: string };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  versions: any;
  stats:
    | {
        base_stat: number;
        effort: number;
        stat: { name: string; url: string };
      }[]
    | [];
  types: { slot: number; type: { name: string; url: string } }[] | [];
  weight: number;
}

export interface ICardProps {
  pokemon: IPokemon;
}
