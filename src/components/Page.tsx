import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const Page = () => (
  <>
    <Box>
      <Outlet />
    </Box>
  </>
);
