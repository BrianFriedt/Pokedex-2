import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const Page = () => {
  const [returnPage, setReturnPage] = useState('8');

  useEffect(() => {
    console.log('loading again');
  }, []);

  return (
    <Box>
      <Text>{returnPage}</Text>
      <Outlet context={{ returnPage, setReturnPage }} />
    </Box>
  );
};
