import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopicService } from "../services/topicService";

export default function TopicEdit() {
  const { sectorId, topicId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [examples, setExamples] = useState("");
  const [mathRepresentation, setMathRepresentation] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    async function load() {
      const topic = await TopicService.getById(sectorId!, topicId!);

      setTitle(topic.title);
      setContent(topic.content);
      setExamples(topic.examples.join("\n"));
      setMathRepresentation(topic.mathRepresentation);
      setVideoUrl(topic.videoUrl ?? "");
    }

    load();
  }, [sectorId, topicId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await TopicService.update(sectorId!, topicId!, {
      title,
      content,
      examples: examples.split("\n").map((e) => e.trim()).filter((e) => e),
      mathRepresentation,
      videoUrl,
      subtopics: [],
    });

    navigate(`/sector/${sectorId}/topics`);
  }

  return (
    <div className="page-container">
      <h1>Editar Tópico</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <textarea
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
        />

        <textarea
          value={mathRepresentation}
          onChange={(e) => setMathRepresentation(e.target.value)}
        />

        <input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
