import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, VStack, Text, Spacer, Image, SimpleGrid } from '@chakra-ui/react';
import { PokemonFull } from '../models/PokemonFull';
import { Types } from './Types';

export const Detail = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonFull>();
  const [isLoading, setIsLoading] = useState(true);
  let { page_id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${page_id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setPokemonInfo(data);
        setIsLoading(false);
      });
  });
  if (isLoading) {
    return <Text>Loading!</Text>;
  } else {
    const { id, name, image, types, height, weight, abilities, egg_groups, stats, genus, description } = pokemonInfo!;
    return (
      <>
        <Box bg='#FDF4FF' textColor='black' h='100vh'>
          <VStack>
            <Heading>{name}</Heading>
            <Box w='600px' bg='white' p='10'>
              <Flex>
                <Heading>{name}</Heading>
                <Text>#{id}</Text>
                <Spacer />
                <Types types={types} />
              </Flex>
              <SimpleGrid minChildWidth='200px'>
                <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '000')}.png`}></Image>
                <Box w='200' h='200' bg='red.300'>
                  Stats table
                </Box>
              </SimpleGrid>
              <Text>{genus}</Text>
              <Text>{description}</Text>
              <Text>Profile:</Text>
            </Box>
          </VStack>
        </Box>
      </>
    );
  }
};
