import { FC } from "react";
import { Table, Checkbox, Modal, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";

import NoteItem from "../NoteItem/NoteItem";
import FormAdd from "../FormAdd/FormAdd";
import { setFilter } from "../../redux/notesReducer";
import { Note } from "../../types";

const NoteList: FC = () => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const notes = useSelector(({ notes }) => notes.items);
  const filter = useSelector(({ notes }) => notes.isArchived);
  const filteredNotes = notes.filter(
    (item: Note) => item.isArchived === filter
  );

  return (
    <>
      <Group position="right" spacing="xs" mt={64}>
        <Checkbox
          labelPosition="left"
          label="Show archived notes"
          color="indigo"
          onChange={(e: React.BaseSyntheticEvent) =>
            dispatch(setFilter(e.currentTarget.checked))
          }
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
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((note: Note) => (
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
