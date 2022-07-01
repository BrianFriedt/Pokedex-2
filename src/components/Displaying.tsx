import { Text } from '@chakra-ui/react';
import { useMeta } from '../context/MetaContext';

export const Displaying = () => {
  const { meta } = useMeta();
  const rangeText: string = meta?.total ? `${meta?.from} to ${meta?.to} of ` : ``;
  let displayText = meta ? `Displaying ${rangeText} ${meta?.total} Pokémon` : '';

  return (
    <Text color='gray.400' fontSize={['md', '2xl']}>
      {displayText}&nbsp;
    </Text>
  );
};
