import { apiFetch } from "../api/api";

export interface Sector {
  id?: string;
  name: string;
  description: string;
}

export const SectorService = {
  getAll: async (): Promise<Sector[]> =>
    apiFetch("/sector"),

  getById: async (id: string): Promise<Sector> =>
    apiFetch(`/sector/${id}`),

  create: async (data: Omit<Sector, "id">) =>
    apiFetch("/sector", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: async (id: string, data: Omit<Sector, "id">) =>
    apiFetch(`/sector/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: async (id: string) =>
    apiFetch(`/sector/${id}`, {
      method: "DELETE",
    }),
};