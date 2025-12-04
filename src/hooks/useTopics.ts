import { useEffect, useState } from "react";
import { TopicService } from "../services/topicService";
import type {Topic} from "../services/topicService";


export function useTopics(sectorId: string) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await TopicService.getAll(sectorId);
    setTopics(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [sectorId]);

  return { topics, loading, reload: load };
}
