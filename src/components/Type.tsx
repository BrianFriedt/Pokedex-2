import { Button } from '@chakra-ui/react';
import { getColorByType } from '../helpers/getColorByType';
import { fadeOut } from '../helpers/fadeOut';

interface Props {
  type: string;
  key: string;
}

export const Type = ({ type }: Props) => {
  return (
    <Button
      as='div'
      textColor='white'
      bg={`${getColorByType(type)}`}
      _hover={type === 'ghost' ? { backgroundColor: 'white' } : {}}
      transitionDuration='0.5s'
    >
      {type}
    </Button>
  );
};
