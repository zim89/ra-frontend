import { FC, FormEvent, useState } from "react";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { IconCalendar } from "@tabler/icons-react";

import { addNote } from "../../redux/notesReducer";
import categories from "../../data/category.json";

interface FormAddProps {
  onClose: () => void;
}

type NewNote = {
  id: string;
  created_at: string;
  name: string;
  category: string | null;
  content: string;
  dates: string[];
  isArchived: boolean;
};

const FormAdd: FC<FormAddProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string | null>("null");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: NewNote = {
      id: nanoid(),
      created_at: new Date().toLocaleString(),
      name,
      category,
      content,
      dates: [],
      isArchived: false,
    };

    date ? newNote.dates.push(date.toLocaleDateString()) : null;

    if (name && category && content) {
      dispatch(addNote(newNote));
      onClose();
    } else {
      alert("Please, fill all fields with asterisk");
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

        <DatePickerInput
          mt={16}
          minDate={new Date()}
          valueFormat="DD.MM.YYYY"
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          label="Set Date:"
          placeholder="Date input"
          maw={400}
          mx="auto"
          name="date"
          value={date}
          onChange={setDate}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </>
  );
};

export default FormAdd;
