import { FC } from "react";
import { Stats } from "../../types";

interface StatsItemProps {
  stat: Stats;
}

const StatsItem: FC<StatsItemProps> = ({ stat }) => {
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
