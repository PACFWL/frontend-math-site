import { useEffect, useState } from "react";
import { SectorService } from "../services/sectorService";
import type { Sector } from "../services/sectorService";

export function useSectors() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await SectorService.getAll();
    setSectors(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return { sectors, loading, reload: load };
}
