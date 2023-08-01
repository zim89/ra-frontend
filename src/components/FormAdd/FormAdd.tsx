import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addNote } from "../../redux/notesReducer";
import { nanoid } from "@reduxjs/toolkit";
import { IconCalendar } from "@tabler/icons-react";
import { FC, useState } from "react";

// interface AddPizzaFormProps {
//   addPizza: (newPizza: Pizza) => void;
// }

const categories = [
  { value: "Task", label: "Task" },
  { value: "Quote", label: "Quote" },
  { value: "Idea", label: "Idea" },
  { value: "Random Thought", label: "Random Thought" },
];

const initState = {
  name: "",
  price: "",
  img: "",
};

const FormAdd: FC = ({ onClose }) => {
  const [note, setNote] = useState<{
    title: string;
    price: string;
    img: string;
  }>(initState);

  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: "",
      category: "Task",
      content: "",
      date: null,
    },
  });

  const handleSubmit = ({ name, category, content, date }) => {
    const dates = [];
    date ? dates.push(date.toLocaleDateString()) : null;
    dispatch(
      addNote({
        id: nanoid(),
        name,
        category,
        content,
        dates,
        created_at: new Date().toLocaleString(),
        isArchived: false,
      })
    );
    onClose();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* 
        <TextInput withAsterisk label="Name:" {...form.getInputProps("name")} />
         */}
        <TextInput withAsterisk label="Name:" {...form.getInputProps("name")} />

        <Select
          label="Category:"
          withAsterisk
          placeholder="Pick one"
          data={categories}
          {...form.getInputProps("category")}
        />

        <TextInput
          withAsterisk
          label="Content:"
          {...form.getInputProps("content")}
        />

        <DatePickerInput
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          label="Set Date:"
          placeholder="Date input"
          maw={400}
          mx="auto"
          {...form.getInputProps("date")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </>
  );
};
export default FormAdd;
