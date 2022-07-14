import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Text, Button, Center, Spacer } from '@chakra-ui/react';
import { useDetailId } from '../context/DetailIdContext';
import { usePokemonList } from '../context/PokemonListContex';
import { useMeta } from '../context/MetaContext';
import { useNameAndPage } from '../context/NameAndPageContext';
import { DetailCard } from './DetailCard';
import { useTotalNumOfPokemon } from '../context/TotalNumberOfPokemonContext';
import { Invalid } from './Invalid';
import { LoadingDots } from './LoadingDots';

export const DetailPage = () => {
  const { page_id } = useParams();
  const pageId = parseInt(page_id!);
  let navigate = useNavigate();
  const { setDetailId } = useDetailId();
  const { pokemonList, setPokemonList } = usePokemonList();
  const { meta } = useMeta();
  const { nameAndPage, setNameAndPage } = useNameAndPage();
  const [prev, setPrev] = useState({ value: 0, isLoading: true });
  const [next, setNext] = useState({ value: 0, isLoading: true });
  const { totalNumOfPokemon } = useTotalNumOfPokemon();
  const [title, setTitle] = useState('Title');
  const [detailPageBackgroundColor, setDetailPageBackgroundColor] = useState('#a8ded9');

  const pokemonIsInPokemonList = (id: number) => {
    for (let i = 0; i < pokemonList.length; i++) {
      if (pokemonList[i].id === id) {
        return true;
      }
    }
    return false;
  };

  const initializePrevAndNext = () => {
    if (pokemonList.length !== 0) {
      if (pokemonIsInPokemonList(pageId)) {
        for (let i = 0; i < pokemonList.length; i++) {
          if (pokemonList[i].id === pageId) {
            if (pokemonList[i - 1]) {
              setPrev({ value: pokemonList[i - 1].id, isLoading: false });
            } else {
              if (nameAndPage.page !== 1) {
                fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page - 1}`)
                  .then((res) => res.json())
                  .then(({ data }) => {
                    setPrev({ value: data[data.length - 1].id, isLoading: false });
                  });
              } else {
                setPrev({ value: 0, isLoading: false });
              }
            }
            if (pokemonList[i + 1]) {
              setNext({ value: pokemonList[i + 1].id, isLoading: false });
            } else {
              if (nameAndPage.page !== meta?.last_page) {
                fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page + 1}`)
                  .then((res) => res.json())
                  .then(({ data }) => {
                    setNext({ value: data[0].id, isLoading: false });
                  });
              } else {
                setNext({ value: 0, isLoading: false });
              }
            }
            return;
          }
        }
      } else if (pokemonList[pokemonList.length - 1].id < pageId) {
        setPrev({ value: pokemonList[pokemonList.length - 1].id, isLoading: false });
        fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page + 1}`)
          .then((res) => res.json())
          .then(({ data }) => {
            setPokemonList(data);
            setNext({ value: data[1].id, isLoading: false });
          });
        setNameAndPage({ name: nameAndPage.name, page: nameAndPage.page + 1 });
      } else {
        setNext({ value: pokemonList[0].id, isLoading: false });
        fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page - 1}`)
          .then((res) => res.json())
          .then(({ data }) => {
            setPokemonList(data);
            setPrev({ value: data[data.length - 2].id, isLoading: false });
          });
        setNameAndPage({ name: nameAndPage.name, page: nameAndPage.page - 1 });
      }
    } else {
      setPrev({ value: pageId - 1, isLoading: false });
      setNext({ value: pageId + 1 > totalNumOfPokemon ? 0 : pageId + 1, isLoading: false });
    }
  };

  useEffect(() => {
    initializePrevAndNext();
    setDetailId(pageId);
  }, [pageId]);

  if (pageId > totalNumOfPokemon || pageId < 1 || isNaN(pageId)) {
    return <Invalid />;
  }
  return (
    <Box bg={detailPageBackgroundColor} textColor='black' h='100vh'>
      <Flex w='100%' pt='5' px={['3', '5']} flexWrap='wrap' alignItems='center'>
        <Button
          order={1}
          as='a'
          href={`/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(`/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page}`, { replace: true });
          }}
          bg='rgb(255, 255, 255, 0.35)'
          size={['md', 'md', 'lg']}
          mr='2'
        >
          <Text fontSize={['sm', 'lg']} transform='scale(-1,1)'>
            &nbsp;&#10132;
          </Text>
          Back
        </Button>
        <Spacer order={2} />
        <Button
          order={[3, 2]}
          p='3'
          as='a'
          w='16'
          href={`/pokemon/${prev.value}`}
          visibility={prev.value === 0 ? 'hidden' : 'visible'}
          onClick={(event) => {
            event.preventDefault();
            if (!prev.isLoading) {
              setPrev({ value: prev.value, isLoading: true });
              navigate(`/pokemon/${prev.value}`);
            }
          }}
        >
          {prev.isLoading ? <LoadingDots /> : `< ${prev.value}`}
        </Button>
        <Text
          order={[6, 4]}
          fontSize={['3xl', '4xl', '5xl']}
          color={'rgb(255, 255, 255, 0.5)'}
          flexGrow='5'
          w={['100%', 'max-content']}
          maxW={['none', '64']}
          textAlign='center'
          flexShrink='initial'
        >
          {title}
        </Text>
        <Button
          order={5}
          p='3'
          as='a'
          w='16'
          href={`/pokemon/${next.value}`}
          visibility={next.value === 0 ? 'hidden' : 'visible'}
          onClick={(event) => {
            event.preventDefault();
            if (!next.isLoading) {
              setNext({ value: next.value, isLoading: true });
              navigate(`/pokemon/${next.value}`);
            }
          }}
        >
          {next.isLoading ? <LoadingDots /> : `${next.value} >`}
        </Button>
        <Spacer order={[5, 6]} />
        <Spacer order={[4, 7]} position={['inherit', 'absolute']} />
      </Flex>
      <Center bg={detailPageBackgroundColor}>
        <Box w='5xl' bg='white' p={['5', '5', '5', '8']} m={['3', '5', '5', '10']} borderRadius='2xl' boxShadow='lg'>
          <DetailCard pageId={pageId} setTitle={setTitle} setDetailPageBackgroundColor={setDetailPageBackgroundColor} />
        </Box>
      </Center>
    </Box>
  );
};
