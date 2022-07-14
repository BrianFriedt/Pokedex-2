import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [pokemonListIsLoading, setPokemonListIsLoading] = useState(true);
  return {
    pokemonListIsLoading,
    setPokemonListIsLoading,
  };
};

const PokemonListIsLoadingContext = createContext({} as ReturnType<typeof useValue>);

const PokemonListIsLoadingProvider = (props: PropsWithChildren<{}>) => {
  return <PokemonListIsLoadingContext.Provider value={useValue()} {...props} />;
};

const usePokemonListIsLoading = () => useContext(PokemonListIsLoadingContext);

export { PokemonListIsLoadingProvider, usePokemonListIsLoading };
