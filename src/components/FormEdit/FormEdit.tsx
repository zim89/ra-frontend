import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { editNote } from "../../redux/notesReducer";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

const categories = [
  { value: "Task", label: "Task" },
  { value: "Quote", label: "Quote" },
  { value: "Idea", label: "Idea" },
  { value: "Random Thought", label: "Random Thought" },
];

const FormEdit = ({ note, onClose }) => {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const { id, dates } = note;
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: note.name,
      category: note.category,
      content: note.content,
      dates: dates,
    },
  });

  const handleSubmit = (values: {
    name: string;
    category: string;
    content: string;
  }) => {
    const { name, category, content } = values;
    let newDate: string | null;
    dateValue ? (newDate = dateValue.toLocaleDateString()) : (newDate = null);
    dispatch(
      editNote({
        id,
        name,
        category,
        content,
        date: newDate,
      })
    );
    onClose();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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

        <TextInput
          label="Dates:"
          value={dates.length > 0 ? dates.join(", ") : ""}
          disabled
        />

        <DatePickerInput
          label="Pick date"
          placeholder="Pick date"
          value={dateValue}
          onChange={setDateValue}
          mx="auto"
          maw={400}
        />
        {/* <DatePickerInput
          icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          label="Set Date:"
          placeholder="Date input"
          maw={400}
          mx="auto"
          {...form.getInputProps("date")}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
};
export default FormEdit;
