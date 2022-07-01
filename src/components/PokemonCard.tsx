import { Center, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/Pokemon';
import { PokemonImage } from './PokemonImage';
import { Types } from './Types';

interface Props {
  pokemon: Pokemon;
  key: number;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { name, id, types } = pokemon;

  const navigate = useNavigate();
  return (
    <Center
      as='button'
      onClick={() => navigate(`/pokemon/${id}`)}
      bg='white'
      textColor='black'
      p='4'
      boxShadow='lg'
      borderRadius='xl'
      transition='0.5s'
      _hover={{ transform: 'scale(1.10)', border: `` }}
    >
      <Stack w='100%'>
        <Text fontSize={['3xl']} fontWeight='bold'>
          {name}
        </Text>
        <Center>
          <PokemonImage id={id}></PokemonImage>
        </Center>
        <Types types={types}></Types>
      </Stack>
    </Center>
  );
};
