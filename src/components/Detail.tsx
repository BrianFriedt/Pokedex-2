import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Spacer, Image, SimpleGrid, Center, Button } from '@chakra-ui/react';
import { PokemonFull } from '../models/PokemonFull';
import { Types } from './Types';
import { Loading } from './Loading';
import { StatsTable } from './StatsTable';
import { getColorByType } from '../helpers/getColorByType';
import { ProfileStat } from './ProfileStat';

export const Detail = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonFull>();
  let { page_id } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
          <Flex w={'100%'} pt={'5'} px={['3', '5']}>
            <Button
              as='a'
              onClick={() => {
                navigate(-1);
              }}
              bg='rgb(255, 255, 255, 0.35)'
              size={['md', 'lg']}
              minW='max-content'
            >
              <Text fontSize={['sm', 'lg']} transform={'scale(-1,1)'}>
                &nbsp;&#10132;
              </Text>
              Back
            </Button>
            <Spacer />
            <Text pr={'5%'} fontSize={['3xl', '4xl', '5xl']} color={'rgb(255, 255, 255, 0.5)'} flexShrink='initial'>
              {name}
            </Text>
            <Spacer />
          </Flex>
          <Center bg={getColorByType(types[0])} pb='5'>
            <Box w='5xl' bg='white' p={['5', '5', '8']} m={['3', '5', '10']} borderRadius='2xl' boxShadow='lg'>
              <Flex alignItems='baseline' flexWrap='wrap'>
                <Heading>{name}</Heading>
                <Text fontSize={'2xl'} color='gray' px='2'>
                  #{id}
                </Text>
                <Spacer />
                <Types types={types} />
              </Flex>

              <SimpleGrid minChildWidth={['210px', '300px', '300px']}>
                <Center>
                  <Image maxH='350px' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '000')}.png`}></Image>
                </Center>
                <Center>
                  <StatsTable stats={stats} color={getColorByType(types[1] ?? types[0])} />
                </Center>
              </SimpleGrid>
              <Box px={'2'}>
                <Text fontWeight='bold' fontSize='lg' pt='3'>
                  {genus}
                </Text>
                <Text>{description}</Text>
              </Box>

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
          </Center>
        </Box>
      </>
    );
  }
};
