import { Box, Center, Flex, Spacer, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/Pokemon';
import { Types } from './Types';
import PokemonCardImage from './PokemonCardImage';

interface Props {
  pokemon: Pokemon;
  key: number;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { name, id, types } = pokemon;
  const navigate = useNavigate();

  return (
    <Center
      as='a'
      href={`/pokemon/${id}`}
      onClick={(event: any) => {
        event.preventDefault();
        navigate(`/pokemon/${id}`);
      }}
      bg='white'
      textColor='black'
      p='4'
      boxShadow='lg'
      borderRadius='xl'
      transition='0.5s'
      _hover={{ transform: 'scale(1.10)', border: `` }}
      maxW={['300', '300', 'unset']}
      width='100%'
      margin='auto'
    >
      <Stack w='100%' spacing='none'>
        <Flex>
          <Text mb='-3' fontSize={['3xl']} fontWeight='bold'>
            {name}
          </Text>
          <Spacer />
          <Text fontSize={['md', 'lg', 'lg', 'xl']} color='gray.300'>
            #{id}
          </Text>
        </Flex>
        <Center minH='200'>
          <PokemonCardImage id={id} />
        </Center>

        <Box mt='-1'>
          <Types types={types}></Types>
        </Box>
      </Stack>
    </Center>
  );
};
