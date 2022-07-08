import { Box, ButtonGroup, Flex, Spacer } from '@chakra-ui/react';
import { getColorByType } from '../helpers/getColorByType';

interface Props {
  types: string[];
}

export const Types = ({ types }: Props) => {
  return (
    <Flex>
      <Spacer />
      <ButtonGroup>
        {types.map((type) => (
          <Box
            as='div'
            textColor='white'
            bg={`${getColorByType(type)}`}
            _hover={{ backgroundColor: type === 'ghost' ? 'white' : '' }}
            transitionDuration='0.5s'
            px='4'
            py='2'
            borderRadius='lg'
            textTransform='capitalize'
            key={type}
          >
            {type}
          </Box>
        ))}
      </ButtonGroup>
    </Flex>
  );
};
