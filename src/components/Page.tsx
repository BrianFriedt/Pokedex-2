import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { PageProvider } from '../context/PageContext';
import { PokemonListProvider } from '../context/PokemonListContex';
import { MetaProvider } from '../context/MetaContext';

export const Page = () => {
  return (
    <Box bg='#FDF4FF' minH={'100vh'}>
      <PageProvider>
        <PokemonListProvider>
          <MetaProvider>
            <Outlet />
          </MetaProvider>
        </PokemonListProvider>
      </PageProvider>
    </Box>
  );
};
