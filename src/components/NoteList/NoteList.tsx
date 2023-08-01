import {
  Table,
  Checkbox,
  Flex,
  Modal,
  Button,
  Group,
  Box,
} from "@mantine/core";
import NoteItem from "../NoteItem/NoteItem";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/notesReducer";
import { useDisclosure } from "@mantine/hooks";
import FormAdd from "../FormAdd/FormAdd";

const NoteList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const notes = useSelector(({ notes }) => notes.items);
  const filter = useSelector(({ notes }) => notes.isArchived);
  const filteredNotes = notes.filter((item) => item.isArchived === filter);

  return (
    <>
      <Group position="right" spacing="xs" mt={64}>
        <Checkbox
          labelPosition="left"
          label="Show archived notes"
          color="indigo"
          onChange={(e) => dispatch(setFilter(e.currentTarget.checked))}
        />

        <Button size="xs" onClick={open}>
          Create Note
        </Button>
      </Group>

      <Table striped withBorder withColumnBorders mt={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th width="150px">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((note) => (
            <tr key={note.id}>
              <NoteItem note={note} />
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal opened={opened} onClose={close} title="Create note:">
        <FormAdd onClose={close} />
      </Modal>
    </>
  );
};
export default NoteList;
