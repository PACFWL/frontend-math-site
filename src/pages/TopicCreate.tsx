import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopicService } from "../services/topicService";

export default function TopicCreate() {
  const { sectorId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [examples, setExamples] = useState<string>(""); // string quebrada por linha
  const [mathRepresentation, setMathRepresentation] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await TopicService.create(sectorId!, {
      title,
      content,
      examples: examples.split("\n").map((e) => e.trim()).filter((e) => e),
      mathRepresentation,
      videoUrl,
      subtopics: [], // pode adicionar depois
    });

    navigate(`/sector/${sectorId}/topics`);
  }

  return (
    <div className="page-container">
      <h1>Criar Tópico</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <textarea
          placeholder="Exemplos (1 por linha)"
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
        />

        <textarea
          placeholder="Representação Matemática"
          value={mathRepresentation}
          onChange={(e) => setMathRepresentation(e.target.value)}
        />

        <input
          placeholder="Video URL (opcional)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button className="btn-primary" type="submit">Salvar</button>
      </form>
    </div>
  );
}
