import { apiFetch } from "../api/api";

export interface Subtopic {
  title: string;
  content: string;
}

export interface Topic {
  id?: string;
  title: string;
  content: string;
  examples: string[];
  mathRepresentation: string;
  videoUrl?: string;
  subtopics: Subtopic[];
}

export const TopicService = {
  getAll: async (sectorId: string): Promise<Topic[]> =>
    apiFetch(`/sectors/${sectorId}/topics`),

  getById: async (sectorId: string, topicId: string): Promise<Topic> =>
    apiFetch(`/sectors/${sectorId}/topics/${topicId}`),

  create: async (sectorId: string, data: Omit<Topic, "id">) =>
    apiFetch(`/sectors/${sectorId}/topics`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: async (sectorId: string, topicId: string, data: Omit<Topic, "id">) =>
    apiFetch(`/sectors/${sectorId}/topics/${topicId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: async (sectorId: string, topicId: string) =>
    apiFetch(`/sectors/${sectorId}/topics/${topicId}`, {
      method: "DELETE",
    }),
};
