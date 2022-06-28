import { Center, Image, Text, VStack } from '@chakra-ui/react';
import { fadeInDelay } from '../helpers/fadeInDelay';

export const Loading = () => {
  return (
    <Center w='100%' height='100vh' bg='#FDF4FF'>
      <VStack transition='2s' animation={fadeInDelay(1)}>
        <Image src='https://thumbs.gfycat.com/DampSpanishCleanerwrasse-max-1mb.gif'></Image>
        <Text textColor='black' fontSize='3xl'>
          Loading...
        </Text>
      </VStack>
    </Center>
  );
};
