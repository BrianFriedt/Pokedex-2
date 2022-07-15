import {Button, Input, Stack} from '@chakra-ui/react';
import {RefObject, createRef, ChangeEvent} from 'react';
import {useReturnPage} from '../context/ReturnPageContext';
import _ from 'lodash';
import {useNameAndPage} from '../context/NameAndPageContext';

export const Search = () => {
  const {
    nameAndPage: {name},
    setNameAndPage
  } = useNameAndPage();
  const searchBar: RefObject<HTMLInputElement> = createRef();
  const {returnPage} = useReturnPage();

  const searchByName = (searchTerm: string) => {
    setNameAndPage({name: searchTerm, page: searchTerm === '' ? returnPage : 1});
  };

  const clearSearch = () => {
    if (name !== '') {
      searchBar.current!.value = '';
      setNameAndPage({name: '', page: returnPage});
    }
  };

  return (
    <Stack w='100%' direction='row' alignItems='center' spacing='0'>
      <Input
        onChange={_.debounce((event: ChangeEvent<HTMLInputElement>) => searchByName(event.target.value.trim()), 500)}
        ref={searchBar}
        textColor='black'
        defaultValue={name}
        placeholder='Search'
        _placeholder={{color: 'gray.200'}}
        fontSize={['3xl', '4xl', '4xl', '5xl']}
        py={['2', '4', '4', '6']}
        pb={['2', '4', '4', '7']}
        w='100%'
        background={`url('https://www.seekpng.com/png/full/71-712261_lens-clipart-magnifier-search-icon-png-grey.png') no-repeat left #f2faf9`}
        backgroundSize={['27px', '34px', '34px', '40px']}
        backgroundPosition={['6px', '7px', '7px', '10px']}
        paddingLeft={['37', '45', '45', '55']}
        borderEndRadius='0'
      />
      <Button
        onClick={() => {
          clearSearch();
        }}
        fontSize={['2xl', '3xl', '3xl', '4xl']}
        borderStartRadius='0'
        bg='#009688'
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
