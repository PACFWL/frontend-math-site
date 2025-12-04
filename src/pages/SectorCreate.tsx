import { useState } from "react";
import { SectorService } from "../services/sectorService";
import { useNavigate } from "react-router-dom";
import "../styles/sectorCreate.css";

export default function SectorCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await SectorService.create({ name, description });
    navigate("/sector");
  }

  return (
<div className="page-container">
  <h1>Criar Setor</h1>

  <form onSubmit={handleSubmit}>
    <input
      placeholder="Nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <textarea
      placeholder="Descrição"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <button className="btn-primary" type="submit">Salvar</button>
  </form>
</div>
  );
}