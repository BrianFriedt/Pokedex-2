import { Box, Center, Image, Text, VStack } from '@chakra-ui/react';
import { fadeInDelay } from '../helpers/fadeInDelay';

export const Loading = () => {
  return (
    <Center w='100%'>
      <VStack>
        <Box animation={fadeInDelay(1)}>
          <Image src='https://thumbs.gfycat.com/DampSpanishCleanerwrasse-max-1mb.gif' />
          <Center>
            <Text textColor='black' fontSize='3xl'>
              Loading...
            </Text>
          </Center>
        </Box>
        <VStack animation={fadeInDelay(12)}>
          <Text textColor='black' fontSize='2xl'>
            Still working...
          </Text>
          <Text textColor='black' fontSize='xl'>
            {'(Sometimes things are a bit slow around here)'}
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
};
