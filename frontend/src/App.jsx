import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CoursesPage from "./Pages/CoursesPage";
import NotesPage from "./Pages/NotesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;