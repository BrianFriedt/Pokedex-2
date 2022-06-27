import * as React from 'react';
import { Flex, Button, ButtonGroup, Heading, Input, Circle } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { Meta } from '../models/Meta';

interface Props {
  meta?: Meta;
  isLoading: boolean;
}

export const Header = ({ meta, isLoading }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: string = searchParams.get('page') ?? '1';

  const handleClick = (button: string) => {
    if (!isLoading) {
      switch (button) {
        case 'start':
          if (meta!.current_page !== 1) setSearchParams({ name: name, page: '1' });
          break;
        case 'back':
          if (meta!.current_page !== 1) setSearchParams({ name: name, page: (parseInt(page) - 1).toString() });
          break;
        case 'next':
          if (meta!.current_page !== meta!.last_page) setSearchParams({ name: name, page: (parseInt(page) + 1).toString() });
          break;
        case 'end':
          if (meta!.current_page !== meta!.last_page) setSearchParams({ name: name, page: meta!.last_page.toString() });
          break;
        default:
          break;
      }
    }
  };

  return (
    <Flex bg='#F5EBFF' px='7' py='10' justifyContent='space-evenly'>
      <ButtonGroup>
        <Circle onClick={() => handleClick('start')} as='a' href='' size='16' bg='#574F62' fontSize='5xl' pb='1'>
          &#8647;
        </Circle>
        <Circle onClick={() => handleClick('back')} as='a' href='#' size='16' bg='#574F62' fontSize='3xl' transform='scale(-1,1)'>
          &#10132;
        </Circle>
      </ButtonGroup>

      <Heading textColor='black' fontSize='5xl' px='5'>
        Pokédex
      </Heading>
      <Input placeholder='Search' textColor='black' bg='white' fontSize='5xl' p='8' h='8' w='100%' border=' 3px solid black'></Input>
      <Button fontSize='5xl' border=' 3px solid black' bg='grey' p='8'>
        Clear
      </Button>

      <ButtonGroup pl='7'>
        <Circle onClick={() => handleClick('next')} as='a' href='#' size='16' bg='#574F62' fontSize='3xl'>
          &#10132;
        </Circle>
        <Circle onClick={() => handleClick('end')} as='a' href='#' size='16' bg='#574F62' fontSize='5xl' pb='1'>
          &#8649;
        </Circle>
      </ButtonGroup>
    </Flex>
  );
};
