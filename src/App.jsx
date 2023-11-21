import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/Error404";
import PlayerPage from "./components/pages/PlayerPage";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player/:playlistId" element={<PlayerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

