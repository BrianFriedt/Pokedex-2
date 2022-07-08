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
    const abortController = new AbortController();
    setIsLoading(true);
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?${new URLSearchParams({ name, page })}`, { signal: abortController.signal })
      .then((res) => res.json())
      .then(({ data, meta }) => {
        setMeta(meta);
        setPokemonList(data);
        setIsLoading(false);
      });
    return function cancel() {
      abortController.abort();
    };
  }, [name, page, setIsLoading, setMeta, setPokemonList]);

  if (isLoading) {
    return (
      <Center w='100%' minH='100vh'>
        <Loading />
      </Center>
    );
  } else if (pokemonList.length === 0) {
    return (
      <SimpleGrid columns={[1, 2, 2, 3, 4, 5]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        <VStack bg='white' textColor='black' p='4' boxShadow='lg' borderRadius='xl' transition='0.5s' opacity='50%' w='100%'>
          <Text fontSize='2xl' fontWeight='bold'>
            No Pokémon found
          </Text>
          <Image w='100%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPy5QQucspA0nyTIRnWhqdpvyS30CN6Zfh7Q&usqp=CAU'></Image>
        </VStack>
      </SimpleGrid>
    );
  } else {
    return (
      <SimpleGrid columns={[1, 2, 3, 3, 4, 5, 6]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        {pokemonList.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>;
        })}
      </SimpleGrid>
    );
  }
};
