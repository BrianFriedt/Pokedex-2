import { Box, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getColorByType } from '../helpers/getColorByType';
import { PokemonFull } from '../models/PokemonFull';
import { Loading } from './Loading';
import { PokemonDetailImage } from './PokemonDetailImage';
import { ProfileStat } from './ProfileStat';
import { StatBar } from './StatBar';
import { Types } from './Types';

interface Props {
  pageId: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDetailPageBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}
export const DetailCard = ({ pageId, setTitle, setDetailPageBackgroundColor }: Props) => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonFull>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pageId}`, { signal: abortController.signal })
      .then((res) => res.json())
      .then(({ data }) => {
        setPokemonInfo(data);
        setIsLoading(false);
      });

    return function cancel() {
      abortController.abort();
    };
  }, [pageId]);

  if (isLoading) {
    return <Loading />;
  } else {
    const { id, name, types, height, weight, abilities, egg_groups, stats, genus, description } = pokemonInfo!;
    setDetailPageBackgroundColor(getColorByType(types[0]));
    setTitle(name);
    return (
      <Box>
        <Flex alignItems='baseline' flexWrap='wrap'>
          <Heading>{isLoading ? 'Loading...' : name}</Heading>
          <Text fontSize='2xl' color='gray' px='2'>
            #{id}
          </Text>
          <Spacer />
          <Types types={types} />
        </Flex>

        <Flex w='100%' flexWrap='wrap' justifyContent='center'>
          <Center minW={['0', '350px']} minH={['0', '350px']}>
            <PokemonDetailImage id={id} />
          </Center>
          <Center flexGrow='1' minW={['0', '80']}>
            <Box w='100%'>
              {Object.entries(stats).map((stat) => {
                return <StatBar stat={stat[0]} value={stat[1]} color={getColorByType(types[1] ?? types[0])} key={stat[0]} />;
              })}
            </Box>
          </Center>
        </Flex>
        <Box px='2'>
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
            <ProfileStat title='Height' value={`${height} m`} capitalize={false} />
            <ProfileStat title='Weight' value={`${weight} kg`} capitalize={false} />
          </Box>
          <Box flexGrow='1' px='2'>
            <ProfileStat title='Abilities' value={abilities.join(', ')} capitalize={true} />
            <ProfileStat title='Egg Groups' value={egg_groups.join(', ')} capitalize={true} />
          </Box>
        </Flex>
      </Box>
    );
  }
};
