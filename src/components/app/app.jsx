import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Hotels } from "../../pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="about" element={<Hotels />} />
    </Routes>
  );
}

export default App;
