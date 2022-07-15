import {Box} from '@chakra-ui/react';
import {Outlet} from 'react-router-dom';
import {ReturnPageProvider} from '../context/ReturnPageContext';
import {DetailIdProvider} from '../context/DetailIdContext';
import {PokedexProvider} from '../context/PokedexContex';
import {NameAndPageProvider} from '../context/NameAndPageContext';

export const Page = () => {
  return (
    <Box bg='#a8ded9' minH='100vh'>
      <ReturnPageProvider>
        <DetailIdProvider>
          <PokedexProvider>
            <NameAndPageProvider>
              <Outlet />
            </NameAndPageProvider>
          </PokedexProvider>
        </DetailIdProvider>
      </ReturnPageProvider>
    </Box>
  );
};
