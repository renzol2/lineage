import { Flex, Heading } from '@chakra-ui/react';

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading fontSize="7vw" fontWeight="light">
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: 'Lineage',
};
