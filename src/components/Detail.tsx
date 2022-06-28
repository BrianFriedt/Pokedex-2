import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, VStack, Text, Spacer, Image, SimpleGrid, Center } from '@chakra-ui/react';
import { PokemonFull } from '../models/PokemonFull';
import { Types } from './Types';
import { Loading } from './Loading';
import { StatsTable } from './StatsTable';
import { FastAverageColor } from 'fast-average-color';
import { getColorByType } from '../helpers/getColorByType';
import { ProfileStat } from './ProfileStat';

export const Detail = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonFull>();
  const [isLoading, setIsLoading] = useState(true);
  let { page_id } = useParams();
  let navigate = useNavigate();

  async function getColor() {
    var image;
    const fac = new FastAverageColor();
    const pokemonImage = document!.querySelector('.detail-page')!.querySelector('img');
    pokemonImage!.crossOrigin = 'A';
    const color = fac.getColor(pokemonImage);
    console.log(color.hex);
  }

  useEffect(() => {
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${page_id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setPokemonInfo(data);
        setIsLoading(false);
      });
  });
  if (isLoading) {
    return <Loading />;
  } else {
    const { id, name, types, height, weight, abilities, egg_groups, stats, genus, description } = pokemonInfo!;
    return (
      <>
        <Box className='detail-page' bg={getColorByType(types[0])} textColor='black' h='100vh'>
          <VStack>
            <Heading>{name}</Heading>
            <Box w='50%' bg='white' p='10' borderRadius='2xl' boxShadow='lg'>
              <Flex alignItems='center' flexWrap='wrap'>
                <Heading>{name}&nbsp;</Heading>
                <Text>#{id}</Text>
                <Spacer />
                <Types types={types} />
              </Flex>

              <SimpleGrid minChildWidth='250px'>
                <Center>
                  <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '000')}.png`}></Image>
                </Center>

                <StatsTable stats={stats} color={getColorByType(types[1] ?? types[0])} />
              </SimpleGrid>
              <Text fontWeight='bold' fontSize='lg'>
                {genus}
              </Text>
              <Text>{description}</Text>
              <Text backgroundColor={getColorByType(types[1] ?? types[0])} textColor='white' fontWeight='bold' fontSize='lg' px='3' py='1' my='3'>
                Profile:
              </Text>
              <Flex flexWrap='wrap'>
                <Box flexGrow='1' px='2'>
                  <ProfileStat title='Height' value={`${height} m`} capitalize={false}></ProfileStat>
                  <ProfileStat title='Weight' value={`${weight} kg`} capitalize={false}></ProfileStat>
                </Box>
                <Box flexGrow='1' px='2'>
                  <ProfileStat title='Abilities' value={abilities.join(', ')} capitalize={true}></ProfileStat>
                  <ProfileStat title='Egg Groups' value={egg_groups.join(', ')} capitalize={true}></ProfileStat>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Box>
      </>
    );
  }
};
