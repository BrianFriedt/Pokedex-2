import { keyframes } from '@emotion/react';

export function fadeOut(timeInSeconds: number) {
  const fadeOut = keyframes`0% {visibility: visible;} 100% {visibility: hidden;}`;

  return `${fadeOut} ${timeInSeconds}s`;
}
