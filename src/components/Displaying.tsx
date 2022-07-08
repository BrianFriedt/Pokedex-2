import { Text } from '@chakra-ui/react';
import { useMeta } from '../context/MetaContext';

export const Displaying = () => {
  const { meta } = useMeta();
  const rangeText: string = meta?.total ? `${meta?.from} to ${meta?.to} of ` : ``;
  let displayText = meta ? `Displaying ${rangeText} ${meta?.total} Pokémon` : '';

  return (
    <Text textAlign='center' color='gray.400' fontSize={['md', 'lg', 'xl', '2xl']} py={['2', '3']}>
      {displayText}
    </Text>
  );
};
