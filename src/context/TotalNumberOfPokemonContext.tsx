import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useValue = () => {
  const [totalNumOfPokemon, setTotalNumOfPokemon] = useState(1);
  return {
    totalNumOfPokemon,
    setTotalNumOfPokemon,
  };
};

const TotalNumOfPokemonContext = createContext({} as ReturnType<typeof useValue>);

const TotalNumOfPokemonProvider = (props: PropsWithChildren<{}>) => {
  return <TotalNumOfPokemonContext.Provider value={useValue()} {...props} />;
};

const useTotalNumOfPokemon = () => useContext(TotalNumOfPokemonContext);

export { TotalNumOfPokemonProvider, useTotalNumOfPokemon };
