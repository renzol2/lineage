import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
  membersList: Member[];
  changeMember: (member: Member, i: number) => Promise<void>;
  removeMember: (member: Member, i: number) => Promise<void>;
}

/**
 * Table to display PSA members
 */
const MembersTable = ({
  membersList,
  changeMember,
  removeMember,
}: MembersTableProps) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  return (
    <Box>
      <Table>
        <TableCaption>PSA Members</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Class of</Th>
            <Th># of adings</Th>
            <Th># of aks</Th>
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
              <Td>{member.adings}</Td>
              <Td>{member.aks}</Td>

              {/* Actions */}
              <Td>
                <HStack>
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
                          {`Are you sure you want to delete "${member.name}"?
                            This will delete all pairings with ${member.name} as well.`}
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
    </Box>
  );
};

export default MembersTable;
