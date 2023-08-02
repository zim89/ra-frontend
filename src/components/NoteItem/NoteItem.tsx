import { ActionIcon, Group, Modal } from "@mantine/core";
import { IconArchive, IconTrash, IconEdit } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteNote, archiveNote } from "../../redux/notesReducer";
import { useDisclosure } from "@mantine/hooks";
import FormEdit from "../FormEdit/FormEdit";
import { FC } from "react";
import { Note } from "../../types";

interface NoteItemProps {
  note: Note;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { id, name, created_at, category, content, dates } = note;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteNote(id));
  const handleArchive = () => dispatch(archiveNote(id));

  return (
    <>
      <td>{name}</td>
      <td>{created_at}</td>
      <td>{category}</td>
      <td>{content}</td>
      <td>{dates.length > 0 ? dates.join(", ") : null}</td>
      <td>
        <Group position="center" spacing="xs">
          <ActionIcon color="green" variant="outline" onClick={open}>
            <IconEdit size="1rem" />
          </ActionIcon>
          <ActionIcon variant="outline" onClick={handleArchive}>
            <IconArchive size="1rem" />
          </ActionIcon>
          <ActionIcon color="red" variant="outline" onClick={handleDelete}>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </td>

      <Modal opened={opened} onClose={close} title="Edit note:">
        <FormEdit onClose={close} noteId={id} />
      </Modal>
    </>
  );
};
export default NoteItem;
