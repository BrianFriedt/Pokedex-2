import { useEffect, useState } from 'react';

interface Props {
  id: number;
}

export const PokemonImage = ({ id }: Props) => {
  let [imageLink, setImageLink] = useState(`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${id}.icon.png`);

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
  useEffect(() => {
    checkIfImageExists(imageLink, (exists) => {
      if (!exists) {
        console.log(`GET ${imageLink} caused an error. Switching the link to an accesible image now.`);
        setImageLink(`https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${id}_11.png`);
      }
    });
  });

  return <img src={imageLink} alt='pokemon' />;
};
