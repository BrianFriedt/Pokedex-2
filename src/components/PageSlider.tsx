import { useMeta } from '../context/MetaContext';
import { useSearchParams } from 'react-router-dom';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useReturnPage } from '../context/ReturnPageContext';

export const PageSlider = () => {
  const { meta } = useMeta();
  const [searchParams, setSearchParams] = useSearchParams();
  let name: string = searchParams.get('name') ?? '';
  let page: number = parseInt(searchParams.get('page') ?? '1');
  const [sliderValue, setSliderValue] = useState(page);
  const { setReturnPage } = useReturnPage();

  useEffect(() => {
    setSliderValue(page);
  }, [name, page]);

  const handleChange = (index: number) => {
    if (name === '') {
      setReturnPage(index);
    }
    setSearchParams({ name: name, page: index.toString() });
  };
  return (
    <Slider
      h='8'
      textColor='black'
      value={sliderValue}
      min={1}
      max={meta?.last_page}
      step={1}
      onChange={(value) => {
        setSliderValue(value);
      }}
      onChangeEnd={handleChange}
    >
      <SliderMark value={1} mt='3'>
        1
      </SliderMark>
      <SliderMark value={meta?.last_page ?? 1} mt='3' ml='-3'>
        {meta?.last_page ?? 1}
      </SliderMark>
      <SliderTrack bg='#FDF4FF'>
        <SliderFilledTrack bg='#574F62' />
      </SliderTrack>
      <SliderThumb boxSize='6'>{sliderValue}</SliderThumb>
    </Slider>
  );
};
