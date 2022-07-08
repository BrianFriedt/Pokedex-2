import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { ReturnPageProvider } from '../context/ReturnPageContext';
import { PokemonListProvider } from '../context/PokemonListContex';
import { MetaProvider } from '../context/MetaContext';
import { DetailIdProvider } from '../context/DetailIdContext';

export const Page = () => {
  return (
    <Box bg='#FDF4FF' minH='100vh'>
      <ReturnPageProvider>
        <PokemonListProvider>
          <MetaProvider>
            <DetailIdProvider>
              <Outlet />
            </DetailIdProvider>
          </MetaProvider>
        </PokemonListProvider>
      </ReturnPageProvider>
    </Box>
  );
};
