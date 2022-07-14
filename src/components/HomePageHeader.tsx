import { Flex, Heading, Center, Box } from '@chakra-ui/react';
import { Displaying } from './Displaying';
import { ToDetailByIdButton } from './ToDetailByIdButton';
import { Search } from './Search';
import { PageSelect } from './PageSelect';

export const HomePageHeader = () => {
  return (
    <Box position='sticky' top='0' zIndex='999' bg='#83d0c9' px='3' pt='4'>
      <Flex justifyContent='space-evenly' alignItems='center' flexWrap='wrap'>
        <Center w='100%' pb='2'>
          <PageSelect />
        </Center>

        <Flex w={['100%', '100%', 'unset']} flexWrap='wrap' justifyContent='space-around'>
          <Center>
            <Heading textColor='black' fontSize={['4xl', '4xl', '4xl', '5xl']} px={['1', '1', '3']}>
              Pokédex
            </Heading>
          </Center>

          <Center mx={['1', '2', '2', '3']}>
            <ToDetailByIdButton />
          </Center>
        </Flex>

        <Center flexGrow='1' w={['100%', '100%', '40%']} mt={['3', '2', '0']} px={['0', '2', '3']}>
          <Search />
        </Center>

        <Center w='100%'>
          <Displaying />
        </Center>
      </Flex>
    </Box>
  );
};
