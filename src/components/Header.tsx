import { createRef, RefObject, FormEvent } from 'react';
import { Flex, Button, ButtonGroup, Heading, Input, Circle, Stack, Spacer, Center } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useReturnPage } from '../context/PageContext';
import { Displaying } from './Displaying';
import { useIsLoading } from '../context/IsLoadingContext';
import { useMeta } from '../context/MetaContext';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: string = searchParams.get('page') ?? '1';
  const searchBar: RefObject<HTMLInputElement> = createRef();
  const { returnPage, setReturnPage } = useReturnPage();
  const { isLoading } = useIsLoading();
  const { meta } = useMeta();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, buttonName: string) => {
    event.preventDefault();
    if (!isLoading) {
      switch (buttonName) {
        case 'start':
          if (meta!.current_page !== 1) {
            setSearchParams({ name: name, page: '1' });
            if (name === '') setReturnPage('1');
          }
          break;
        case 'back':
          if (meta!.current_page !== 1) {
            setSearchParams({ name: name, page: (parseInt(page) - 1).toString() });
            if (name === '') setReturnPage((parseInt(page) - 1).toString());
          }
          break;
        case 'next':
          if (meta!.current_page !== meta!.last_page) {
            setSearchParams({ name: name, page: (parseInt(page) + 1).toString() });
            if (name === '') setReturnPage((parseInt(page) + 1).toString());
          }
          break;
        case 'end':
          if (meta!.current_page !== meta!.last_page) {
            setSearchParams({ name: name, page: meta!.last_page.toString() });
            if (name === '') setReturnPage(meta!.last_page.toString());
          }
          break;
        default:
          break;
      }
    }
  };

  const debounce = (fn: Function, ms = 3000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchByName: Function = (event: FormEvent<HTMLInputElement>) => {
    setSearchParams({ name: event.currentTarget.value, page: event.currentTarget.value === '' ? returnPage : '1' });
  };

  const clearSearch = () => {
    searchBar.current!.value = '';
    setSearchParams({ name: '', page: returnPage });
  };

  return (
    <Flex bg='#F5EBFF' px={['3', '5', '7']} pt={['4', '6', '10']} justifyContent='space-evenly' alignItems={'center'} flexWrap={['wrap']}>
      <ButtonGroup order={[1]} mb={['0', '3', '0']}>
        <Circle
          onClick={(event) => handleClick(event, 'start')}
          as='a'
          href=''
          size={['12', '14', '14', '16']}
          bg='#574F62'
          fontSize={['3xl', '4xl', '4xl', '5xl']}
          pb='1'
        >
          &#8647;
        </Circle>
        <Circle
          onClick={(event) => handleClick(event, 'back')}
          as='a'
          href=''
          size={['12', '14', '14', '16']}
          bg='#574F62'
          fontSize={['xl', '2xl', '2xl', '3xl']}
          transform='scale(-1,1)'
        >
          &#10132;
        </Circle>
      </ButtonGroup>

      <Spacer order={[2, 5, 4]} />

      <Center order={[4, 2, 2]} w={['100%', 'max-content']} flexGrow='1'>
        <Heading textColor='black' fontSize={['4xl', '4xl', '4xl', '5xl']} px={['2', '3', '4']}>
          Pokédex
        </Heading>
      </Center>

      <Stack order={[4, 4, 3]} flexGrow={['10']} w={['100%', '100%', '40%']} direction={'row'} alignItems='center' spacing='0'>
        <Input
          onChange={(event) => {
            debounce(searchByName(event), 5000);
          }}
          ref={searchBar}
          textColor='black'
          defaultValue={name}
          placeholder='Search'
          _placeholder={{ color: 'gray.200' }}
          fontSize={['3xl', '5xl', '5xl']}
          paddingLeft='55'
          py={['2', '6', '6']}
          pb={['3', '7', '7']}
          w='100%'
          background={`url('https://www.seekpng.com/png/full/71-712261_lens-clipart-magnifier-search-icon-png-grey.png') no-repeat left white`}
          backgroundSize={'40px'}
          backgroundPosition={'10px'}
        ></Input>
        <Button
          onClick={() => {
            clearSearch();
          }}
          fontSize={['2xl', '4xl', '4xl']}
          border=' 2px solid black'
          bg='grey'
          py={['3', '6', '6']}
          minW='max-content'
        >
          Clear
        </Button>
      </Stack>

      <ButtonGroup order={[3, 3, 5]} mb={['0', '3', '0']}>
        <Circle
          onClick={(event) => handleClick(event, 'next')}
          as='a'
          href=''
          size={['12', '14', '14', '16']}
          bg='#574F62'
          fontSize={['xl', '2xl', '2xl', '3xl']}
        >
          &#10132;
        </Circle>
        <Circle
          onClick={(event) => handleClick(event, 'end')}
          as='a'
          href=''
          size={['12', '14', '14', '16']}
          bg='#574F62'
          fontSize={['3xl', '4xl', '4xl', '5xl']}
          pb='1'
        >
          &#8649;
        </Circle>
      </ButtonGroup>
      <Center w='100%' order={6} py={['4']}>
        <Displaying />
      </Center>
    </Flex>
  );
};
