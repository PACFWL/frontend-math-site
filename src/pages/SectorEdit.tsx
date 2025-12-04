import { useEffect, useState } from "react";
import { SectorService } from "../services/sectorService";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/sectorEdit.css";

export default function SectorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function load() {
      const sector = await SectorService.getById(id!);
      setName(sector.name);
      setDescription(sector.description);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await SectorService.update(id!, { name, description });
    navigate("/sector");
  }

  return (
    <div className="page-container">
      <h1>Editar Setor</h1>

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

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}