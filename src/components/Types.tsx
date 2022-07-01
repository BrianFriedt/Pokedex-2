import { ButtonGroup, Flex, Spacer } from '@chakra-ui/react';
import { Type } from './Type';

interface Props {
  types: string[];
}

export const Types = ({ types }: Props) => {
  return (
    <Flex>
      <Spacer />
      <ButtonGroup>
        {types.map((type) => (
          <Type type={type} key={type}></Type>
        ))}
      </ButtonGroup>
    </Flex>
  );
};
