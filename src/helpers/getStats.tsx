import categories from "../data/category.json";

const getStats = (data) => {
  const stats: string[] = [];

  categories.forEach((cat) => {
    const item = { category: cat.label, active: 0, archived: 0 };
    const filteredData = data.filter((note) => note.category === cat.label);
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
