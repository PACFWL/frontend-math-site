import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/styles.css";
import SectorList from "./pages/SectorList";
import SectorCreate from "./pages/SectorCreate";
import SectorEdit from "./pages/SectorEdit";


import TopicList from "./pages/TopicList";
import TopicCreate from "./pages/TopicCreate";
import TopicEdit from "./pages/TopicEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redireciona raiz para /sector */}
        <Route path="/" element={<Navigate to="/sector" />} />

        {/* CRUD de setores */}
        <Route path="/sector" element={<SectorList />} />
        <Route path="/sector/create" element={<SectorCreate />} />
        <Route path="/sector/edit/:id" element={<SectorEdit />} />

        {/* CRUD de tópicos */}
        <Route path="/sector/:sectorId/topics" element={<TopicList />} />
        <Route path="/sector/:sectorId/topics/create" element={<TopicCreate />} />
        <Route path="/sector/:sectorId/topics/edit/:topicId" element={<TopicEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
