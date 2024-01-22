import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonsList = createAsyncThunk(
  "pokemon/fetchList",
  async (type: string) => {
    if (type === "All Types") {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
        );
        const count = response.data.count;
        const results = await Promise.all(
          response.data.results.map(
            async (pokemon: { name: string; url: string }) => {
              const currPokemon = await axios.get(pokemon.url);
              console.log({
                name: pokemon.name,
                ...currPokemon.data,
              });
              return {
                name: pokemon.name,
                ...currPokemon.data,
              };
            }
          )
        );
        return { results, count };
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        throw error;
      }
    } else {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${type}`
        );
        const count = response.data.pokemon.length;
        const results = await Promise.all(
          response.data.pokemon.map(
            async (item: {
              pokemon: { name: string; url: string };
              slot: number;
            }) => {
              const currPokemon = await axios.get(item.pokemon.url);
              console.log({
                name: item.pokemon.name,
                ...currPokemon.data,
              });
              return {
                name: item.pokemon.name,
                ...currPokemon.data,
              };
            }
          )
        );
        return { results, count };
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        throw error;
      }
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "pokemonAbility/fetchAbility",
  async (pokemonId: number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/item/${pokemonId}/`
      );
      return response.data.category.name;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPokemon = createAsyncThunk(
  "pokemonAbility/fetchPokemon",
  async (pokemonId: number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      return { ...response.data };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPokemonEvolutions = createAsyncThunk(
  "pokemonEvolutions/fetchPokemonEvolutions",
  async (pokemonSpeciesUrl: string) => {
    const response = await axios.get(pokemonSpeciesUrl);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);

    const evolveChain = evolutionChainResponse.data.chain;

    const getEvolutionDetails = async (evolution: any): Promise<any> => {
      const evolvesTo: any = [];

      async function fetchDetails(speciesUrl: string) {
        const speciesResponse = await axios.get(speciesUrl);
        const pokemonId = speciesResponse.data.id;
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        return {
          ...result.data,
        };
      }

      async function fetchEvolutionChain(evolutionChain: any) {
        const currentPokemonDetails = await fetchDetails(
          evolutionChain.species.url
        );

        // Check if the Pokémon is already in evolvesTo based on its ID
        if (
          !evolvesTo.some(
            (pokemon: any) => pokemon.id === currentPokemonDetails.id
          )
        ) {
          evolvesTo.push(currentPokemonDetails);
        }

        if (evolutionChain.evolves_to) {
          await Promise.all(
            evolutionChain.evolves_to.map(async (nextEvolution: any) => {
              const nextPokemonDetails = await fetchDetails(
                nextEvolution.species.url
              );

              // Check if the Pokémon is already in evolvesTo based on its ID
              if (
                !evolvesTo.some(
                  (pokemon: any) => pokemon.id === nextPokemonDetails.id
                )
              ) {
                evolvesTo.push(nextPokemonDetails);
              }

              await fetchEvolutionChain(nextEvolution);
            })
          );
        }
      }

      await fetchEvolutionChain(evolution);
      return {
        evolvesTo,
      };
    };

    const evolutions: any = [await getEvolutionDetails(evolveChain)];
    return evolutions;
  }
);
