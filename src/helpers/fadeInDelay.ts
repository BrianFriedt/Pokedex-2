import { keyframes } from '@emotion/react';

export function fadeInDelay(timeInSeconds: number) {
  const fadeIn = keyframes`0% {opacity: 0;} 20% {opacity: 0;} 70% {opacity: 1;}`;

  return `${fadeIn} ${timeInSeconds}s`;
}
