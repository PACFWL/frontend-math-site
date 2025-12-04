import { Link, useParams } from "react-router-dom";
import { TopicService } from "../services/topicService";
import { useTopics } from "../hooks/useTopics";

export default function TopicList() {
  const { sectorId } = useParams();
  const { topics, loading, reload } = useTopics(sectorId!);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza?")) return;
    await TopicService.delete(sectorId!, id);
    reload();
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Tópicos</h1>

      <Link to={`/sector/${sectorId}/topics/create`}>Criar novo tópico</Link>

      <ul>
        {topics.map((t) => (
          <li key={t.id}>
            <b>{t.title}</b>
            <div>
              <Link to={`/sector/${sectorId}/topics/edit/${t.id}`}>Editar</Link>
              {" | "}
              <button onClick={() => handleDelete(t.id!)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
