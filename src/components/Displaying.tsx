import {Text} from '@chakra-ui/react';
import {usePokedex} from '../context/PokedexContex';

export const Displaying = () => {
  const {
    pokedex: {meta}
  } = usePokedex();
  const rangeText: string = meta?.total ? `${meta?.from} to ${meta?.to} of ` : ``;
  let displayText = meta ? `Displaying ${rangeText} ${meta?.total} Pokémon` : '';

  return (
    <Text textAlign='center' color='#d9f0ee' fontSize={['md', 'lg', 'xl', '2xl']} py={['2', '3']}>
      {displayText}
    </Text>
  );
};
