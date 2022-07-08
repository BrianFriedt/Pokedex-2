import {
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Box,
  Text,
  Tooltip,
  Center,
} from '@chakra-ui/react';
import { createRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDetailId } from '../context/DetailIdContext';
import _ from 'lodash';

export const ToDetailByIdButton = () => {
  const navigate = useNavigate();
  const { detatilId, setDetailId } = useDetailId();
  const inputNum: RefObject<HTMLInputElement> = createRef();

  return (
    <Stack
      fontWeight='normal'
      direction='row'
      bg='#574F62'
      borderRadius='lg'
      spacing='none'
      fontSize={['sm', 'md', 'md', 'lg']}
      pr='0'
      h='max-content'
    >
      <Center
        pl={['2', '3']}
        my='0'
        as='a'
        href={`/pokemon/${detatilId}`}
        onClick={(event: any) => {
          event.preventDefault();
          navigate(`/pokemon/${inputNum.current!.value}`);
        }}
      >
        <Text>Go to pokemon #</Text>
      </Center>
      <Box ml={['-2', '-3.5']}>
        <Tooltip hasArrow openDelay={250} label='type, scroll, or click to edit!'>
          <NumberInput allowMouseWheel size={['sm', 'md', 'md', 'lg']} maxW={['70px', '85px']} min={1} max={553} defaultValue={detatilId}>
            <NumberInputField
              onChange={(event) => setDetailId(parseInt(event.target.value))}
              onWheel={_.debounce((event) => {
                setDetailId(parseInt(event.target.value));
              }, 500)}
              ref={inputNum}
              border='none'
              _focusVisible={{ border: 'none ' }}
              autoFocus={true}
            />

            <NumberInputStepper>
              <NumberIncrementStepper onClick={() => setDetailId(parseInt(inputNum.current!.value))} />
              <NumberDecrementStepper onClick={() => setDetailId(parseInt(inputNum.current!.value))} />
            </NumberInputStepper>
          </NumberInput>
        </Tooltip>
      </Box>
    </Stack>
  );
};
