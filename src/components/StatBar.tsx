import { Box, Flex, Text } from '@chakra-ui/react';
import { expandToWidth } from '../helpers/expandToWidth';

interface Props {
  stat: string;
  value: number;
  color: string;
}
export const StatBar = ({ stat, value, color }: Props) => {
  const getMaxValue = (typeOfStat: string) => {
    switch (typeOfStat) {
      case 'hp':
        return 255;
      case 'speed':
        return 160;
      case 'attack':
        return 165;
      case 'defense':
        return 230;
      case 'special-attack':
        return 154;
      case 'special-defense':
        return 230;
      default:
        return 0;
    }
  };

  return (
    <Flex alignItems='center' flexWrap={['wrap', 'nowrap']}>
      <Text textTransform='capitalize' w={['100%', '100px']} pr='3' fontSize={['sm', 'md']} textAlign={['left', 'right']}>
        {stat.replaceAll('-', ' ')}
      </Text>
      <Box position='relative' h={['5', '6']} w='100%' bg='gray.200' mb={['3', '4']} mt={['0', '3']} borderRadius='full'>
        <Box
          position='absolute'
          bg={color}
          animation={expandToWidth((value / getMaxValue(stat)) * 100)}
          h='inherit'
          w={`${(value / getMaxValue(stat)) * 100}%`}
          borderRadius='full'
        ></Box>
        <Text position='absolute' h='inherit' pl='2' textColor='white' fontSize={['sm', 'md']}>
          {value}
        </Text>
      </Box>
    </Flex>
  );
};
