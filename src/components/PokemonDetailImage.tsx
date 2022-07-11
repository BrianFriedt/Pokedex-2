import { Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import loadingSpinner from '../images/loadingSpinner.gif';
import { fadeInDelay } from '../helpers/fadeInDelay';

interface Props {
  id: number;
}

export const PokemonDetailImage = ({ id }: Props) => {
  const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id.toString().padStart(3, '000')}.png`;
  const [isLoading, setIsLoading] = useState(true);

  const checkIfImageIsLoaded = (url: string, callback: (loaded: boolean) => void) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      img.onerror = () => {
        callback(false);
      };
    }
  };

  useEffect(() => {
    checkIfImageIsLoaded(url, (loaded) => {
      if (loaded) {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return (
      <Center animation={fadeInDelay(0.5)}>
        <img src={loadingSpinner} alt='loading...'></img>
      </Center>
    );
  } else {
    return <img style={{ maxHeight: '350px' }} src={url} alt={`pokemon ${id}`} />;
  }
};
