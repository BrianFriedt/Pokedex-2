import { Button, Input, Stack } from '@chakra-ui/react';
import { RefObject, createRef, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useReturnPage } from '../context/ReturnPageContext';
import { useIsLoading } from '../context/IsLoadingContext';
import _ from 'lodash';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  const searchBar: RefObject<HTMLInputElement> = createRef();
  const { returnPage } = useReturnPage();
  const { setIsLoading } = useIsLoading();

  const searchByName = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ name: event.target.value.trim(), page: event.target.value.trim() === '' ? returnPage.toString() : '1' });
  };

  const clearSearch = () => {
    if (name !== '') {
      searchBar.current!.value = '';
      setIsLoading(true);
      setSearchParams({ name: '', page: returnPage.toString() });
    }
  };

  return (
    <Stack w='100%' direction='row' alignItems='center' spacing='0'>
      <Input
        onChange={_.debounce(searchByName, 500)}
        ref={searchBar}
        textColor='black'
        defaultValue={name}
        placeholder='Search'
        _placeholder={{ color: 'gray.200' }}
        fontSize={['3xl', '4xl', '4xl', '5xl']}
        py={['2', '4', '4', '6']}
        pb={['2', '4', '4', '7']}
        w='100%'
        background={`url('https://www.seekpng.com/png/full/71-712261_lens-clipart-magnifier-search-icon-png-grey.png') no-repeat left white`}
        backgroundSize={['27px', '34px', '34px', '40px']}
        backgroundPosition={['6px', '7px', '7px', '10px']}
        paddingLeft={['37', '45', '45', '55']}
        borderEndRadius='0'
      ></Input>
      <Button
        onClick={() => {
          clearSearch();
        }}
        fontSize={['2xl', '3xl', '3xl', '4xl']}
        borderStartRadius='0'
        bg='#574F62'
        px={['2', '3']}
        py={['3', '4', '4', '27px']}
        minW='max-content'
        fontWeight='normal'
      >
        Clear
      </Button>
    </Stack>
  );
};
