import { Box } from '@chakra-ui/react';
import { getColorByType } from '../helpers/getColorByType';

interface Props {
  type: string;
  key: string;
}

export const Type = ({ type }: Props) => {
  return (
    <Box
      as='div'
      textColor='white'
      bg={`${getColorByType(type)}`}
      _hover={{ backgroundColor: type === 'ghost' ? 'white' : {} }}
      transitionDuration='0.5s'
      px='4'
      py='2'
      borderRadius='lg'
      textTransform='capitalize'
    >
      {type}
    </Box>
  );
};
