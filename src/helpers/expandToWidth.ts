import { keyframes } from '@emotion/react';

export function expandToWidth(width: string) {
  const expand = keyframes`0% {width: 0;}  100% {width: ${width};}`;

  return `${expand} 3s`;
}
