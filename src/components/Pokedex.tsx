import { SimpleGrid } from '@chakra-ui/react';
import { Pokemon } from '../models/Pokemon';
import { PokemonCard } from './PokemonCard';

interface Props {
  pokemonList: Pokemon[];
  isLoading: boolean;
}

export const Pokedex = ({ pokemonList, isLoading }: Props) => {
  if (isLoading) {
    return <>Loading!</>;
  } else {
    return (
      <SimpleGrid minChildWidth='300px' spacing='10' p='10'>
        {pokemonList.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>;
        })}
      </SimpleGrid>
    );
  }
};
