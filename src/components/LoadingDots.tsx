import { Image } from '@chakra-ui/react';
import { fadeInDelay } from '../helpers/fadeInDelay';
import loadingDots from '../images/loadingDots.gif';

export const LoadingDots = () => {
  return <Image animation={fadeInDelay(1)} mx='-2' src={loadingDots} />;
};
