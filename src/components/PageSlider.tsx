import { useMeta } from '../context/MetaContext';
import { Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useReturnPage } from '../context/ReturnPageContext';
import { useNameAndPage } from '../context/NameAndPageContext';

export const PageSlider = () => {
  const { meta } = useMeta();
  const {
    nameAndPage: { name, page },
    setNameAndPage,
  } = useNameAndPage();
  const [sliderValue, setSliderValue] = useState(page);
  const { setReturnPage } = useReturnPage();

  useEffect(() => {
    setSliderValue(page);
  }, [name, page]);

  const handleChange = (index: number) => {
    if (name === '') {
      setReturnPage(index);
    }
    setNameAndPage({ name: name, page: index });
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
      <EndSliderMark />
      <SliderTrack bg='#cdece9'>
        <SliderFilledTrack bg='#009688' />
      </SliderTrack>
      <SliderThumb boxSize='6'>{sliderValue}</SliderThumb>
    </Slider>
  );
};

const EndSliderMark = () => {
  const { meta } = useMeta();
  if (meta && meta?.last_page !== 1) {
    return (
      <SliderMark value={meta?.last_page ?? 1} mt='3' ml='-3'>
        {meta?.last_page ?? 1}
      </SliderMark>
    );
  } else {
    return <></>;
  }
};
