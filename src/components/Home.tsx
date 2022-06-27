import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Meta } from '../models/Meta';
import { Pokemon } from '../models/Pokemon';
import { Header } from './Header';
import { Pokedex } from './Pokedex';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: string = searchParams.get('page') ?? '1';
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<Meta>();

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
  return (
    <Box bg='#FDF4FF'>
      <Header meta={meta} isLoading={isLoading}></Header>
      <Pokedex pokemonList={pokemonList} isLoading={isLoading}></Pokedex>
    </Box>
  );
};
