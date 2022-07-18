import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Pokemon} from '../models/Pokemon';

interface Meta {
  current_page: number;
  last_page: number;
  path: string;
  from: number;
  to: number;
  per_page: number;
  total: number;
}

interface Pokedex {
  list: Pokemon[];
  isLoading: boolean;
  meta?: Meta;
  size: number;
}

const useValue = () => {
  const [pokedex, setPokedex] = useState<Pokedex>({list: [], isLoading: true, meta: undefined, size: 553});
  return {
    pokedex,
    setPokedex
  };
};

const PokedexContext = createContext({} as ReturnType<typeof useValue>);

const PokedexProvider = (props: PropsWithChildren<{}>) => {
  return <PokedexContext.Provider value={useValue()} {...props} />;
};

const usePokedex = () => useContext(PokedexContext);

export {PokedexProvider, usePokedex};
