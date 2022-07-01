import { Box } from '@chakra-ui/react';
import { Stats } from '../models/Stats';
import { StatBar } from './StatBar';

interface Props {
  stats: Stats;
  color: string;
}

export const StatsTable = ({ stats, color }: Props) => {
  return (
    <Box w='100%'>
      {Object.entries(stats).map((stat) => {
        return <StatBar stat={stat[0]} value={stat[1]} color={color} key={stat[0]}></StatBar>;
      })}
    </Box>
  );
};
