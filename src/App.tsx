import { Container, MantineProvider } from "@mantine/core";
import { FC } from "react";

import NoteList from "./components/NoteList/NoteList";
import StatsList from "./components/StatsList/StatsList";

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="md" px="md">
        <NoteList />
        <StatsList />
      </Container>
    </MantineProvider>
  );
};

export default App;
