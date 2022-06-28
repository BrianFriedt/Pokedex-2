import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  stat: string;
  value: number;
  color: string;
}
export const StatBar = ({ stat, value, color }: Props) => {
  const getMaxStat = (typeOfStat: string) => {
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
        return 1000;
    }
  };

  return (
    <Box>
      <Flex alignItems='center'>
        <Text textTransform='capitalize' w='100px' p='3' flexShrink='unset'>
          {stat.replaceAll('-', ' ')}
        </Text>
        <Flex h='max-content' w='100%' bg='gray.300' my='4'>
          <Box bg={color} w={`${(value / getMaxStat(stat)) * 100}%`}>
            <Text textColor='white'>&nbsp;{value}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
