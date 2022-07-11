import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { ReturnPageProvider } from '../context/ReturnPageContext';
import { MetaProvider } from '../context/MetaContext';
import { DetailIdProvider } from '../context/DetailIdContext';
import { TotalNumOfPokemonProvider } from '../context/TotalNumberOfPokemonContext';

export const Page = () => {
  return (
    <Box bg='#FDF4FF' minH='100vh'>
      <ReturnPageProvider>
        <MetaProvider>
          <DetailIdProvider>
            <TotalNumOfPokemonProvider>
              <Outlet />
            </TotalNumOfPokemonProvider>
          </DetailIdProvider>
        </MetaProvider>
      </ReturnPageProvider>
    </Box>
  );
};
