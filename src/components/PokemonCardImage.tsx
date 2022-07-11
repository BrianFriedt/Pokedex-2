import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fadeInDelay } from '../helpers/fadeInDelay';
import loadingSpinner from '../images/loadingSpinner.gif';

interface Props {
  id: number;
}

const PokemonCardImage = ({ id }: Props) => {
  const [imageLink, setImageLink] = useState(`https://projectpokemon.org/images/sprites-models/pgo-sprites/pm${id}.icon.png`);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    });
  });
  if (isLoading) {
    return (
      <Box animation={fadeInDelay(0.5)}>
        <img src={loadingSpinner} alt='loading...' />
      </Box>
    );
  }
  return <img style={{ width: '100%' }} src={imageLink} alt={`pokemon ${id}`} />;
};
export default PokemonCardImage;
