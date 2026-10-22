import React from "react";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import QLSV from "./components/QLSV.jsx";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <QLSV />
    </ThemeProvider>
  );
}

export default App;
