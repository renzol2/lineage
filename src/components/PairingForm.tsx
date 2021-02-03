import { Box, Button, Flex, Spacer, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { addPairing } from '../firebase/pairings';
import { Member } from '../fixtures/Members';
import SearchModal from './SearchModal';

interface PairingFormProps {
  members: Member[];
  refresh: () => Promise<void>;
}

/**
 * Form to create new AKA pairings between PSA members
 */
const PairingForm = ({ members, refresh }: PairingFormProps) => {
  const [ak, setAk] = useState<Member | undefined>();
  const [ading, setAding] = useState<Member | undefined>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const toast = useToast();

  /**
   * Returns member of given id in members list
   * @param memberId id of member
   */
  const findMember = (memberId: string) => {
    return members.find((member) => member.id === memberId);
  };

  /**
   * Callback when submitting a pairing through form
   */
  const submitPairing = async () => {
    if (!ak || !ading) {
      toast({
        title: 'Error',
        description: 'Please select both an AK and an ading.',
        status: 'error',
      });
      return;
    }

    setSubmitting(true);
    await addPairing(ak?.id, ading?.id, '2020');

    setSubmitting(false);
    toast({
      title: 'Success!',
      description: 'Successfully added pairing.',
      status: 'success',
    });

    setAk(undefined);
    setAding(undefined);

    // Refresh the members + pairings list to reflect changes
    await refresh();
  };

  return (
    <Box>
      <Flex my={2} alignItems="center">
        <Text>Select AK: {ak?.name}</Text>
        <Spacer />
        <SearchModal
          members={members}
          onSelect={(id) => setAk(findMember(id))}
        />
      </Flex>
      <Flex my={2} alignItems="center">
        <Text>Select ading: {ading?.name}</Text>
        <Spacer />
        <SearchModal
          members={members}
          onSelect={(id) => setAding(findMember(id))}
        />
      </Flex>
      <Button
        mt={2}
        colorScheme="teal"
        onClick={submitPairing}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating pairing...' : 'Create pairing'}
      </Button>
    </Box>
  );
};

export default PairingForm;
