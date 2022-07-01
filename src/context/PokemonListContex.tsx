import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Pokemon } from '../models/Pokemon';

const useValue = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  return {
    pokemonList,
    setPokemonList,
  };
};

const PokemonListContext = createContext({} as ReturnType<typeof useValue>);

const PokemonListProvider = (props: PropsWithChildren<{}>) => {
  return <PokemonListContext.Provider value={useValue()} {...props} />;
};

const usePokemonList = () => useContext(PokemonListContext);

export { PokemonListProvider, usePokemonList };
