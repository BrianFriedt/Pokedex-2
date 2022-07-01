import { Center, SimpleGrid, VStack, Text, Image } from '@chakra-ui/react';
import { Loading } from './Loading';
import { PokemonCard } from './PokemonCard';
import { useIsLoading } from '../context/IsLoadingContext';
import { useEffect } from 'react';
import { usePokemonList } from '../context/PokemonListContex';
import { useSearchParams } from 'react-router-dom';
import { useMeta } from '../context/MetaContext';

export const Pokedex = () => {
  const [searchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: string = searchParams.get('page') ?? '1';
  const { isLoading, setIsLoading } = useIsLoading();
  const { pokemonList, setPokemonList } = usePokemonList();
  const { setMeta } = useMeta();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?${new URLSearchParams({ name, page })}`)
      .then((res) => res.json())
      .then(({ data, meta }) => {
        setMeta(meta);
        setPokemonList(data);
        setIsLoading(false);
      });
  }, [name, page]);

  if (isLoading) {
    return <Loading />;
  } else if (pokemonList.length === 0) {
    return (
      <SimpleGrid columns={[1, 2, 2, 3, 4, 5]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        <Center bg='white' textColor='black' p='4' boxShadow='lg' borderRadius='xl' transition='0.5s' opacity={'50%'}>
          <VStack w='100%'>
            <Text fontSize={['2xl']} fontWeight='bold'>
              No Pokémon found
            </Text>
            <Center>
              <Image src='https://www.pngitem.com/pimgs/m/485-4858557_sad-mirror-ash-ash-from-pokemon-sad-hd.png'></Image>
            </Center>
          </VStack>
        </Center>
      </SimpleGrid>
    );
  } else {
    return (
      <SimpleGrid columns={[1, 2, 2, 3, 4, 5]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        {pokemonList.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>;
        })}
      </SimpleGrid>
    );
  }
};
