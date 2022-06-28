import { Text } from '@chakra-ui/react';

interface Props {
  title: string;
  value: string;
  capitalize: boolean;
}

export const ProfileStat = ({ title, value, capitalize }: Props) => {
  return (
    <Text fontWeight='bold'>
      {`${title}: `}
      <Text as='span' fontWeight='normal' textTransform={capitalize ? 'capitalize' : 'none'}>
        {value}
      </Text>
    </Text>
  );
};
