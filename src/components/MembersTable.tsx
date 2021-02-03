import { CheckIcon, CloseIcon, DeleteIcon, LinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Member } from '../fixtures/Members';

interface MembersTableProps {
  refresh: () => Promise<Member[]>;
  loading: boolean;
  membersList: Member[];
  changeMember: (member: Member, i: number) => Promise<void>;
  removeMember: (member: Member, i: number) => Promise<void>;
}

const MembersTable = ({
  refresh,
  loading,
  membersList,
  changeMember,
  removeMember,
}: MembersTableProps) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  return (
    <>
      <Flex my={5} alignItems="center" minW="100%">
        <Heading variant="h3">View members</Heading>

        <Spacer />

        {/* Refresh */}
        <Button onClick={refresh} my={5}>
          Refresh members
        </Button>
      </Flex>

      {/* No members notice */}
      {membersList.length === 0 && (
        <Box
          backgroundColor="darkred"
          color="whitesmoke"
          p={25}
          borderRadius={20}
        >
          No members. Add some above!
        </Box>
      )}

      {/* Loading spinner */}
      {loading && (
        <Flex flexDir="column">
          <Spinner mx="auto" />
        </Flex>
      )}

      {!loading && membersList.length > 0 && (
        <Table maxW="100vw" overflowX="scroll">
          <TableCaption>PSA Members</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Class of</Th>
              <Th>Has Adings?</Th>
              <Th>Has AKs?</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {membersList.map((member, i) => (
              <Tr key={member.id}>
                <Td>
                  {/* Name (editable) column */}
                  <Editable
                    defaultValue={member.name}
                    onSubmit={(name) => changeMember({ ...member, name }, i)}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>

                {/* Class (editable) column */}
                <Td>
                  <Editable
                    defaultValue={member.classOf}
                    onSubmit={(classOf) =>
                      changeMember({ ...member, classOf }, i)
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>

                {/* Has Adings/Aks column */}
                <Td>{member.hasAdings ? <CheckIcon /> : <CloseIcon />}</Td>
                <Td>{member.hasAks ? <CheckIcon /> : <CloseIcon />}</Td>

                {/* Actions */}
                <Td>
                  <HStack>
                    <Button size="xs" colorScheme="teal">
                      <LinkIcon />
                    </Button>
                    <Popover>
                      <PopoverTrigger>
                        <Button size="xs" colorScheme="red">
                          <DeleteIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverCloseButton />
                        <PopoverArrow />
                        <PopoverHeader>
                          <Heading size="sm">Confirm deletion</Heading>
                        </PopoverHeader>
                        <PopoverBody>
                          <Text mb={5}>
                            {`Are you sure you want to delete "${member.name}"?`}
                          </Text>
                          <Button
                            isFullWidth
                            colorScheme="red"
                            onClick={async () => {
                              setSubmitting(true);
                              await removeMember(member, i);
                              setSubmitting(false);
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Deleting...' : 'Yes, delete'}
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default MembersTable;
