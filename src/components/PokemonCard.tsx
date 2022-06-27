import { Box, Heading, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/Pokemon';
import { Types } from './Types';

interface Props {
  pokemon: Pokemon;
  key: number;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const { name, id, types } = pokemon;

  const navigate = useNavigate();
  return (
    <Box
      as='a'
      onClick={() => navigate(`/pokemon/${id}`)}
      bg='white'
      textColor='black'
      p='4'
      boxShadow='lg'
      borderRadius='xl'
      transition='0.5s'
      _hover={{ transform: 'scale(1.15)' }}
    >
      <Stack>
        <Heading>{name}</Heading>
        <Box>
          <Image src={`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${id}.icon.png`}></Image>
        </Box>
        <Types types={types}></Types>
      </Stack>
    </Box>
  );
};
