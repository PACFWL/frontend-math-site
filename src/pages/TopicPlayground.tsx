import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TopicService } from "../services/topicService";

import LinearEquationSolver from "../components/LinearEquationSolver";
import QuadraticEquationSolver from "../components/QuadraticEquationSolver";

export default function TopicPlayground() {
  const { sectorId, topicId } = useParams();
  const [topic, setTopic] = useState<any>(null);

  const [leftSide, setLeftSide] = useState("");
  const [rightSide, setRightSide] = useState("");

  useEffect(() => {
    async function load() {
      const t = await TopicService.getById(sectorId!, topicId!);
      setTopic(t);

      const [left, right] = t.mathRepresentation.split("=").map(s => s.trim());
      setLeftSide(left);
      setRightSide(right);
    }
    load();
  }, [sectorId, topicId]);

  if (!topic) return <p>Carregando...</p>;

const cleanedLeft = leftSide.replace(/\s+/g, "");


const isQuadratic =
  /x\^2/.test(cleanedLeft) ||       
  /\d?x\*x/.test(cleanedLeft) ||    
  /\bx\s*\*\s*x\b/.test(cleanedLeft);

  return (
    <div className="page-container">
      <h1>Resolver Equação</h1>

      <p><b>Equação fornecida:</b> {topic.mathRepresentation}</p>

      <div style={{ marginTop: "20px" }}>
        <label>Lado esquerdo:</label>
        <input
          value={leftSide}
          onChange={(e) => setLeftSide(e.target.value)}
        />

        <label>Lado direito:</label>
        <input
          value={rightSide}
          onChange={(e) => setRightSide(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
{isQuadratic ? (
  <QuadraticEquationSolver leftSide={leftSide} rightSide={rightSide} />
) : (
  <LinearEquationSolver leftSide={leftSide} rightSide={rightSide} />
)}
      </div>
    </div>
  );
}
