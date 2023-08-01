import { Table } from "@mantine/core";
import { useSelector } from "react-redux";
import getStats from "../../helpers/getStats";
import StatsItem from "../StatsItem/StatsItem";

const StatsList = () => {
  const notes = useSelector(({ notes }) => notes.items);
  const stats = getStats(notes);
  const hasData = stats.filter((stat) => stat.active || stat.archived);

  return (
    <>
      {hasData.length > 0 && (
        <Table striped withBorder withColumnBorders mt={36} w={400}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Active</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody>
            {hasData.map((stat) => (
              <tr key={stat.category}>
                <StatsItem stat={stat} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default StatsList;
