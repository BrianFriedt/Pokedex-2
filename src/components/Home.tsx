import { Header } from './Header';
import { Pokedex } from './Pokedex';
import { IsLoadingProvider } from '../context/IsLoadingContext';
export const Home = () => {
  return (
    <IsLoadingProvider>
      <Header />
      <Pokedex />
    </IsLoadingProvider>
  );
};
