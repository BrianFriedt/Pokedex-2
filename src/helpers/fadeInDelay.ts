import { keyframes } from '@emotion/react';

export function fadeInDelay(timeInSeconds: number) {
  const fadeIn = keyframes`0% {opacity: 0;} 60% {opacity: 0;} 100% {opacity: 1;}`;

  return `${fadeIn} ${timeInSeconds}s`;
}
