import { Button } from '@chakra-ui/react';

interface Props {
  type: string;
  key: string;
}

export const Type = ({ type }: Props) => {
  return (
    <Button as='div' bg='blue.300'>
      {type}
    </Button>
  );
};
