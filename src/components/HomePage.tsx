import {HomePageHeader} from './HomePageHeader';
import {Pokedex} from './Pokedex';
import {PokemonListIsLoadingProvider} from '../context/PokemonListIsLoadingContext';

export const HomePage = () => {
  return (
    <PokemonListIsLoadingProvider>
      <HomePageHeader />
      <Pokedex />
    </PokemonListIsLoadingProvider>
  );
};
