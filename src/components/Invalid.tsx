import { Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Invalid = () => {
  const navigate = useNavigate();

  return (
    <VStack bg='#FDF4FF' minH='100vh' pt='50'>
      <Text px='4' textAlign='center' fontSize={['xl', '2xl', '3xl']} color='black'>
        Ooops! Looks like you came to an invalid page!
      </Text>
      <Text as='a' href='pokemon/' onClick={() => navigate('/pokemon', { replace: true })} bg='#574F62' p='3' borderRadius='lg'>
        Return to Pokédex app
      </Text>
    </VStack>
  );
};
