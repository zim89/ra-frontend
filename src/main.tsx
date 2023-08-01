import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ru";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>loading data...</p>} persistor={persistor}>
        <DatesProvider settings={{ locale: "ru" }}>
          <App />
        </DatesProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
