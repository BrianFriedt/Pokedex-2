import {Center, SimpleGrid, VStack, Text, Image} from '@chakra-ui/react';
import {Loading} from './Loading';
import {PokemonCard} from './PokemonCard';
import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {usePokedex} from '../context/PokedexContex';
import {useNameAndPage} from '../context/NameAndPageContext';

export const Pokedex = () => {
  const [, setSearchParams] = useSearchParams();
  const {
    nameAndPage: {name, page}
  } = useNameAndPage();
  const {
    pokedex: {list, meta, isLoading, size},
    setPokedex
  } = usePokedex();

  useEffect(() => {
    const abortController = new AbortController();
    setSearchParams({name: name, page: page.toString()});
    setPokedex({list: list, isLoading: true, meta: meta, size: size});
    fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?${new URLSearchParams({name: name, page: page.toString()})}`, {
      signal: abortController.signal
    })
      .then((res) => res.json())
      .then(({data, meta}) => {
        if (name === '') {
          setPokedex({list: data, isLoading: false, meta: meta, size: meta.total});
        } else {
          setPokedex({list: data, isLoading: false, meta: meta, size: size});
        }
      });
    return function cancel() {
      abortController.abort();
    };
  }, [name, page]);

  if (isLoading) {
    return (
      <Center w='100%' minH='100vh'>
        <Loading />
      </Center>
    );
  } else if (list.length === 0) {
    return (
      <SimpleGrid columns={[1, 2, 2, 3, 4, 5]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        <VStack bg='white' textColor='black' p='4' boxShadow='lg' borderRadius='xl' transition='0.5s' opacity='50%' w='100%'>
          <Text fontSize='2xl' fontWeight='bold'>
            No Pokémon found
          </Text>
          <Image w='100%' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPy5QQucspA0nyTIRnWhqdpvyS30CN6Zfh7Q&usqp=CAU' />
        </VStack>
      </SimpleGrid>
    );
  } else {
    return (
      <SimpleGrid columns={[1, 2, 3, 3, 4, 5, 6]} spacing={['4', '4', '7']} p={['5', '5', '8']}>
        {list.map((pokemon, index) => {
          return <PokemonCard key={index} pokemon={pokemon} />;
        })}
      </SimpleGrid>
    );
  }
};
