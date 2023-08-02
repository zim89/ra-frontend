export type Note = {
  id: string;
  created_at: string;
  name: string;
  category: string | null;
  content: string;
  dates: string[];
  isArchived: boolean;
};

export type EditedNote = {
  id: string;
  name: string;
  category: string | null;
  content: string;
  date: string | null;
};

export type Stats = {
  category: string;
  active: number;
  archived: number;
};
