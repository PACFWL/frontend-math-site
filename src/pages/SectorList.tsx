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
    <div className="sector-page">
      <div className="sector-header">
        <h1>Sectores</h1>
        <Link className="btn-primary" to="/sector/create">Criar novo</Link>
      </div>

      <ul className="sector-list">
        {sectors.map((s) => (
          <li key={s.id} className="sector-card">
            <div className="sector-info">
              <h2>{s.name}</h2>
              <p>{s.description}</p>
            </div>

            <div className="sector-actions">
              <Link className="btn-outline" to={`/sector/${s.id}/topics`}>
                Ver Tópicos
              </Link>

              <Link className="btn-edit" to={`/sector/edit/${s.id}`}>
                Editar
              </Link>

              <button
                className="btn-delete"
                onClick={() => handleDelete(s.id!)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
