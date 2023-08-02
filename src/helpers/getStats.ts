import categories from "../data/category.json";
import { Note, Stats } from "../types";

const getStats = (data: Note[]) => {
  const stats: Stats[] = [];

  categories.forEach((cat) => {
    const item: Stats = { category: cat.label, active: 0, archived: 0 };
    const filteredData: Note[] = data.filter(
      (note: Note) => note.category === cat.label
    );
    filteredData.forEach((el) => {
      el.isArchived
        ? (item.archived = item.archived + 1)
        : (item.active = item.active + 1);
    });
    stats.push(item);
  });

  return stats;
};

export default getStats;
