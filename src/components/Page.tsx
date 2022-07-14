import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { ReturnPageProvider } from '../context/ReturnPageContext';
import { MetaProvider } from '../context/MetaContext';
import { DetailIdProvider } from '../context/DetailIdContext';
import { TotalNumOfPokemonProvider } from '../context/TotalNumberOfPokemonContext';
import { PokemonListProvider } from '../context/PokemonListContex';
import { NameAndPageProvider } from '../context/NameAndPageContext';
import { PokemonListIsLoadingProvider } from '../context/PokemonListIsLoadingContext';

export const Page = () => {
  return (
    <Box bg='#a8ded9' minH='100vh'>
      <ReturnPageProvider>
        <MetaProvider>
          <DetailIdProvider>
            <TotalNumOfPokemonProvider>
              <PokemonListProvider>
                <NameAndPageProvider>
                  <PokemonListIsLoadingProvider>
                    <Outlet />
                  </PokemonListIsLoadingProvider>
                </NameAndPageProvider>
              </PokemonListProvider>
            </TotalNumOfPokemonProvider>
          </DetailIdProvider>
        </MetaProvider>
      </ReturnPageProvider>
    </Box>
  );
};
