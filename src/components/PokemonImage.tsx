import {} from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  id: number;
}

export const PokemonImage = ({ id }: Props) => {
  const [imageLink, setImageLink] = useState(`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${id}.icon.png`);

  const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
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

  checkIfImageExists(imageLink, (exists) => {
    if (!exists) {
      console.log('switching the link');
      setImageLink(`https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${id}_11.png`);
    }
  });

  return <img src={imageLink} alt='pokemon' />;
};
