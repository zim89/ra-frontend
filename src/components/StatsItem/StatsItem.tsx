const StatsItem = ({ stat }) => {
  const { category, active, archived } = stat;

  return (
    <>
      <td>{category}</td>
      <td>{active}</td>
      <td>{archived}</td>
    </>
  );
};
export default StatsItem;
