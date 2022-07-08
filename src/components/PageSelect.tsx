import { useMeta } from '../context/MetaContext';
import { useIsLoading } from '../context/IsLoadingContext';
import { useSearchParams } from 'react-router-dom';
import { Box, Center, Flex } from '@chakra-ui/react';
import { useReturnPage } from '../context/ReturnPageContext';
import { PageSlider } from './PageSlider';

export const PageSelect = () => {
  const { meta } = useMeta();
  const { setIsLoading } = useIsLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: number = parseInt(searchParams.get('page') ?? '1');
  const { setReturnPage } = useReturnPage();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, buttonName: string) => {
    event.preventDefault();
    setIsLoading(true);
    switch (buttonName) {
      case 'back':
        if (page !== 1) {
          setSearchParams({ name: name, page: (page - 1).toString() });
          if (name === '') setReturnPage(page - 1);
        }
        break;
      case 'next':
        if (page !== meta!.last_page) {
          setSearchParams({ name: name, page: (page + 1).toString() });
          if (name === '') setReturnPage(page + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Flex w='100%' bg='#574F62' borderRadius='xl' mb={['2', '3']}>
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
      <Box bg='#F5EBFF' flexGrow='1' px='4'>
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
