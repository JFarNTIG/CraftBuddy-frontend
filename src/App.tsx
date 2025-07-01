import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GameToolsApp from "./pages/GameToolsApp";
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameToolsApp />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
