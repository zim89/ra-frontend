import { FC, FormEvent, useState } from "react";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { IconCalendar } from "@tabler/icons-react";

import { editNote } from "../../redux/notesReducer";
import categories from "../../data/category.json";

interface FormEditProps {
  noteId: string;
  onClose: () => void;
}

type Note = {
  id: string;
  created_at: string;
  name: string;
  category: string | null;
  content: string;
  dates: string[];
  isArchived: boolean;
};

const FormEdit: FC<FormEditProps> = ({ noteId, onClose }) => {
  const dispatch = useDispatch();
  const notes = useSelector(({ notes }) => notes.items);
  const note = notes.find((note: Note) => note.id === noteId);

  const [name, setName] = useState<string>(note.name);
  const [category, setCategory] = useState<string | null>(note.category);
  const [content, setContent] = useState<string>(note.content);
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedNote = {
      id: note.id,
      name,
      category,
      content,
      date: date ? date.toLocaleDateString() : null,
    };

    !name || !category || !content
      ? alert("Please, fill all fields with asterisk")
      : onClose();

    if (
      (date ||
        name !== note.name ||
        category !== note.category ||
        content !== note.content) &&
      name &&
      category &&
      content
    ) {
      dispatch(editNote(editedNote));
      onClose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt={16}
          withAsterisk
          label="Name:"
          name="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <Select
          mt={16}
          label="Category:"
          withAsterisk
          placeholder="Pick category"
          data={categories}
          name="category"
          value={category}
          onChange={setCategory}
        />

        <TextInput
          mt={16}
          withAsterisk
          label="Content:"
          name="content"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />

        <TextInput
          mt={16}
          label="Dates:"
          value={note.dates.length > 0 ? note.dates.join(", ") : "No dates"}
          disabled
        />

        <DatePickerInput
          mt={16}
          minDate={new Date()}
          valueFormat="DD.MM.YYYY"
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          label="Set new Date:"
          placeholder="Date input"
          maw={400}
          mx="auto"
          name="date"
          value={date}
          onChange={setDate}
        />

        <Group position="right" mt="md">
          <Button type="submit">Save Note</Button>
        </Group>
      </form>
    </>
  );
};

export default FormEdit;
