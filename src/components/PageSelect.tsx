import {useMeta} from '../context/MetaContext';
import {Box, Center, Flex} from '@chakra-ui/react';
import {useReturnPage} from '../context/ReturnPageContext';
import {PageSlider} from './PageSlider';
import {useNameAndPage} from '../context/NameAndPageContext';

export const PageSelect = () => {
  const {meta} = useMeta();
  const {
    nameAndPage: {name, page},
    setNameAndPage
  } = useNameAndPage();
  const {setReturnPage} = useReturnPage();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, buttonName: string) => {
    event.preventDefault();
    switch (buttonName) {
      case 'back':
        if (page !== 1) {
          setNameAndPage({name: name, page: page - 1});
          if (name === '') setReturnPage(page - 1);
        }
        break;
      case 'next':
        if (page !== meta!.last_page) {
          setNameAndPage({name: name, page: page + 1});
          if (name === '') setReturnPage(page + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Flex w='100%' bg='#009688' borderRadius='xl' mb={['0', '0', '2']}>
      <Center
        as='a'
        href={`/pokemon/?name=${name}&page=${page !== 1 ? page - 1 : page}`}
        onClick={(event: any) => handleClick(event, 'back')}
        h='10'
        w='8'
        transform='scale(-1,1)'
        fontSize='xl'
      >
        &#10132;
      </Center>
      <Box bg='#83d0c9' flexGrow='1' px='4'>
        <PageSlider />
      </Box>
      <Center
        as='a'
        href={`/pokemon/?name=${name}&page=${page !== meta?.last_page ? page + 1 : page}`}
        onClick={(event: any) => handleClick(event, 'next')}
        h='10'
        w='8'
        fontSize='xl'
      >
        &#10132;
      </Center>
    </Flex>
  );
};
