import { useSectors } from "../hooks/useSectors";
import { Link } from "react-router-dom";
import { SectorService } from "../services/sectorService";
import "../styles/sectorList.css";

export default function SectorList() {
  const { sectors, loading, reload } = useSectors();

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza?")) return;
    await SectorService.delete(id);
    reload();
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Sectores</h1>

      <Link to="/sector/create">Criar novo</Link>
     <ul>
        {sectors.map((s) => (
          <li key={s.id}>
            <b>{s.name}</b> — {s.description}

            <div>
              <Link to={`/sector/${s.id}/topics`}>
                Ver Tópicos
              </Link>
              {" | "}
              <Link to={`/sector/edit/${s.id}`}>Editar</Link>
              {" | "}
              <button onClick={() => handleDelete(s.id!)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}