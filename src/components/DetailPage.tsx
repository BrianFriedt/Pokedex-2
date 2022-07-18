import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Center} from '@chakra-ui/react';
import {DetailCard} from './DetailCard';
import {DetailPageHeader} from './DetailPageHeader';
import {Invalid} from './Invalid';
import {usePokedex} from '../context/PokedexContex';

export const DetailPage = () => {
  const {page_id} = useParams();
  const pageId = parseInt(page_id!);
  const {
    pokedex: {size}
  } = usePokedex();
  const [title, setTitle] = useState('Title');
  const [detailPageBackgroundColor, setDetailPageBackgroundColor] = useState('#a8ded9');

  if (pageId > size || pageId < 1 || isNaN(pageId)) {
    return <Invalid />;
  }
  return (
    <Box bg={detailPageBackgroundColor} minH='100vh' textColor='black'>
      <DetailPageHeader title={title} pageId={pageId} />
      <Center>
        <Box w='5xl' bg='white' p={['5', '5', '5', '8']} m={['3', '5', '5', '10']} borderRadius='2xl' boxShadow='lg'>
          <DetailCard pageId={pageId} setTitle={setTitle} setDetailPageBackgroundColor={setDetailPageBackgroundColor} />
        </Box>
      </Center>
    </Box>
  );
};
