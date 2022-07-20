import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Flex, Text, Button, Spacer} from '@chakra-ui/react';
import {useDetailId} from '../context/DetailIdContext';
import {usePokedex} from '../context/PokedexContex';
import {useNameAndPage} from '../context/NameAndPageContext';
import {Invalid} from './Invalid';
import {LoadingDots} from './LoadingDots';

interface Props {
  title: string;
  pageId: number;
}

export const DetailPageHeader = ({title, pageId}: Props) => {
  let navigate = useNavigate();
  const {setDetailId} = useDetailId();
  const {
    pokedex: {list, meta, size},
    setPokedex
  } = usePokedex();
  const {nameAndPage, setNameAndPage} = useNameAndPage();
  const [prev, setPrev] = useState({value: 0, isLoading: true});
  const [next, setNext] = useState({value: 0, isLoading: true});

  const pokemonIsInPokemonList = (id: number) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return true;
      }
    }
    return false;
  };

  const initializePrevAndNext = () => {
    if (list.length === 0) {
      setPrev({value: pageId - 1, isLoading: false});
      setNext({value: pageId + 1 > size ? 0 : pageId + 1, isLoading: false});
    } else {
      if (pokemonIsInPokemonList(pageId)) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === pageId) {
            if (list[i - 1]) {
              setPrev({value: list[i - 1].id, isLoading: false});
            } else {
              if (nameAndPage.page !== 1) {
                fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page - 1}`)
                  .then((res) => res.json())
                  .then(({data}) => {
                    setPrev({value: data[data.length - 1].id, isLoading: false});
                  });
              } else {
                setPrev({value: 0, isLoading: false});
              }
            }
            if (list[i + 1]) {
              setNext({value: list[i + 1].id, isLoading: false});
            } else {
              if (nameAndPage.page !== meta?.last_page) {
                fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page + 1}`)
                  .then((res) => res.json())
                  .then(({data}) => {
                    setNext({value: data[0].id, isLoading: false});
                  });
              } else {
                setNext({value: 0, isLoading: false});
              }
            }
            return;
          }
        }
      } else if (list[list.length - 1].id < pageId) {
        setPrev({value: list[list.length - 1].id, isLoading: false});
        fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page + 1}`)
          .then((res) => res.json())
          .then(({data}) => {
            setPokedex({list: data, isLoading: false, meta: meta, size: size});
            setNext({value: data[1].id, isLoading: false});
          });
        setNameAndPage({name: nameAndPage.name, page: nameAndPage.page + 1});
      } else {
        setNext({value: list[0].id, isLoading: false});
        fetch(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page - 1}`)
          .then((res) => res.json())
          .then(({data}) => {
            setPokedex({list: data, isLoading: false, meta: meta, size: size});
            setPrev({value: data[data.length - 2].id, isLoading: false});
          });
        setNameAndPage({name: nameAndPage.name, page: nameAndPage.page - 1});
      }
    }
  };

  const handleClick = (event: any, button: {value: number; isLoading: boolean}) => {
    event.preventDefault();
    if (!button.isLoading) {
      if (button === prev) setPrev({value: button.value, isLoading: true});
      else setNext({value: button.value, isLoading: true});
      navigate(`/pokemon/${button.value}`);
    }
  };

  useEffect(() => {
    initializePrevAndNext();
    setDetailId(pageId);
  }, [pageId]);

  if (pageId > size || pageId < 1 || isNaN(pageId)) {
    return <Invalid />;
  }
  return (
    <Flex w='100%' pt='5' px={['3', '5']} flexWrap='wrap' alignItems='center'>
      <Button
        order={1}
        as='a'
        href={`/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page}`}
        onClick={(event) => {
          event.preventDefault();
          navigate(`/pokemon?name=${nameAndPage.name}&page=${nameAndPage.page}`, {replace: true});
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
        onClick={(event) => handleClick(event, prev)}
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
        onClick={(event) => handleClick(event, next)}
      >
        {next.isLoading ? <LoadingDots /> : `${next.value} >`}
      </Button>
      <Spacer order={[5, 6]} />
      <Spacer order={[4, 7]} position={['inherit', 'absolute']} />
    </Flex>
  );
};
