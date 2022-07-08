import { useEffect } from 'react';

export const getPokemonImageById = (id: number) => {
  let imageLink = `https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${id}.icon.png`;

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
  const finalLink = () => {
    checkIfImageExists(imageLink, (exists) => {
      if (!exists) {
        console.log('Executing switch Link');
        console.log(`GET ${imageLink} caused an error. Switching the link to an accesible image now.`);
        return `https://projectpokemon.org/images/sprites-models/pgo-sprites/pokemon_icon_${id}_11.png`;
      } else if (exists) {
        console.log('executing logic here');
        return imageLink;
      } else {
        return `https://intern-pokedex.myriadapps.com/images/pokemon/13.png`;
      }
    });
  };

  return finalLink();
};
