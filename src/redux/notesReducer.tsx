import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      name: "Shopping list",
      created_at: "02.05.2023",
      category: "Task",
      content: "Mango, tomatos",
      dates: [],
      isArchived: true,
    },
    {
      id: "2",
      name: "Learn TS",
      created_at: "02.05.2023",
      category: "Task",
      content: "Mango, tomatos",
      dates: [],
      isArchived: false,
    },
    {
      id: "3",
      name: "Shakespeare",
      created_at: "02.05.2023",
      category: "Quote",
      content: "Be not afraid of greatness.",
      dates: ["02.05.2023"],
      isArchived: false,
    },
    {
      id: "4",
      name: "Repair phone",
      created_at: "2023.17.07",
      category: "Task",
      content: "By new instruments",
      dates: ["02.06.2023"],
      isArchived: false,
    },
    {
      id: "5",
      name: "New  hobby",
      created_at: "02.06.2023",
      category: "Idea",
      content: "Kill 7 flies",
      dates: [],
      isArchived: false,
    },
    {
      id: "6",
      name: "Plato",
      created_at: "03.05.2023",
      category: "Quote",
      content: "Courage is knowing what not to fear",
      dates: [],
      isArchived: false,
    },
  ],
  isArchived: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setFilter(state) {
      state.isArchived = !state.isArchived;
    },
    addNote(state, action) {
      state.items.push(action.payload);
    },
    deleteNote(state, action) {
      const index = state.items.findIndex((note) => note.id === action.payload);
      state.items.splice(index, 1);
    },
    archiveNote(state, action) {
      const index = state.items.findIndex((note) => note.id === action.payload);
      state.items[index].isArchived = !state.items[index].isArchived;
    },
    editNote(state, action) {
      const index = state.items.findIndex(
        (note) => note.id === action.payload.id
      );

      if (action.payload.date) {
        state.items[index].dates.push(action.payload.date);
      }

      state.items[index] = {
        ...state.items[index],
        name: action.payload.name,
        category: action.payload.category,
        content: action.payload.content,
      };
    },
  },
});

export const { setFilter, addNote, archiveNote, deleteNote, editNote } =
  notesSlice.actions;
export const notesReducer = notesSlice.reducer;
