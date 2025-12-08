import { Link, useParams } from "react-router-dom";
import { TopicService } from "../services/topicService";
import { useTopics } from "../hooks/useTopics";
import "../styles/topicList.css";

export default function TopicList() {
  const { sectorId } = useParams();
  const { topics, loading, reload } = useTopics(sectorId!);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza?")) return;
    await TopicService.delete(sectorId!, id);
    reload();
  }

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="topic-container">
      <div className="topic-header">
        <h1>Tópicos</h1>
        <Link className="btn-primary" to={`/sector/${sectorId}/topics/create`}>
          Criar novo tópico
        </Link>
      </div>

      <ul className="topic-list">
        {topics.map((t) => (
          <li className="topic-item" key={t.id}>
            <div className="topic-info">
              <b className="topic-title">{t.title}</b>
                <p>{t.content}</p>
            </div>

            <div className="topic-actions">
              <Link
                className="btn-edit"
                to={`/sector/${sectorId}/topics/edit/${t.id}`}
              >
                Editar
              </Link>

              <button
                className="btn-delete"
                onClick={() => handleDelete(t.id!)}
              >
                Excluir
              </button>
              <Link className="btn-play" to={`/sector/${sectorId}/topics/play/${t.id}`}>
  Testar Fórmula
</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
