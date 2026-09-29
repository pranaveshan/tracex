import axios, { AxiosInstance } from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("tracex_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (formData: FormData) => {
    const res = await apiClient.post("/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  },
  me: async () => {
    const res = await apiClient.get("/auth/me");
    return res.data;
  },
};

export const casesApi = {
  list: async (status?: string, priority?: string) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (priority) params.append("priority", priority);
    const res = await apiClient.get(`/cases/?${params.toString()}`);
    return res.data;
  },
  get: async (id: string) => {
    const res = await apiClient.get(`/cases/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await apiClient.post("/cases/", data);
    return res.data;
  },
  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/cases/${id}`, data);
    return res.data;
  },
  addEvent: async (id: string, data: any) => {
    const res = await apiClient.post(`/cases/${id}/events`, data);
    return res.data;
  },
  addEvidence: async (id: string, data: any) => {
    const res = await apiClient.post(`/cases/${id}/evidence`, data);
    return res.data;
  },
};

export const walletsApi = {
  analyze: async (address: string, chain: string = "ethereum") => {
    const res = await apiClient.get(`/wallets/analyze/${address}?chain=${chain}`);
    return res.data;
  },
};

export const traceApi = {
  trace: async (start_address: string, chain: string = "ethereum", max_depth: number = 3, direction: string = "forward") => {
    const res = await apiClient.post("/trace/", {
      start_address,
      chain,
      max_depth,
      direction,
    });
    return res.data;
  },
};

export const graphApi = {
  build: async (addresses: string[], chain: string = "ethereum", depth: number = 2) => {
    const res = await apiClient.post("/graph/build", {
      addresses,
      chain,
      depth,
    });
    return res.data;
  },
};

export const vaspsApi = {
  list: async () => {
    const res = await apiClient.get("/vasps/");
    return res.data;
  },
  identify: async (address: string, chain: string = "ethereum") => {
    const res = await apiClient.get(`/vasps/identify/${address}?chain=${chain}`);
    return res.data;
  },
};

export const clustersApi = {
  list: async () => {
    const res = await apiClient.get("/clusters/");
    return res.data;
  },
  get: async (id: string) => {
    const res = await apiClient.get(`/clusters/${id}`);
    return res.data;
  },
};

export const alertsApi = {
  list: async (severity?: string) => {
    const params = severity ? `?severity=${severity}` : "";
    const res = await apiClient.get(`/alerts/${params}`);
    return res.data;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await apiClient.put(`/alerts/${id}/status?status=${status}`);
    return res.data;
  },
};

export const crossChainApi = {
  trace: async (tx_hash: string, source_chain: string = "ethereum") => {
    const res = await apiClient.post("/cross-chain/trace", {
      tx_hash,
      source_chain,
    });
    return res.data;
  },
  bridges: async () => {
    const res = await apiClient.get("/cross-chain/bridges");
    return res.data;
  },
};

export const intelligenceApi = {
  query: async (query: string, case_id?: string, address?: string) => {
    const res = await apiClient.post("/intelligence/query", {
      query,
      case_id,
      address,
    });
    return res.data;
  },
};

export const reportsApi = {
  generate: async (case_id: string, format: string = "json") => {
    const res = await apiClient.post(`/reports/generate/${case_id}?format=${format}`);
    return res.data;
  },
  list: async () => {
    const res = await apiClient.get("/reports/");
    return res.data;
  },
};

export const searchApi = {
  search: async (query: string) => {
    const res = await apiClient.get(`/search/?q=${encodeURIComponent(query)}`);
    return res.data;
  },
};

export const adminApi = {
  getAuditLogs: async () => {
    const res = await apiClient.get("/admin/audit-logs");
    return res.data;
  },
  getStats: async () => {
    const res = await apiClient.get("/admin/stats");
    return res.data;
  },
};

// Default export has axios instance methods PLUS attached API modules
const api: any = apiClient;
api.auth = authApi;
api.cases = casesApi;
api.wallets = walletsApi;
api.trace = traceApi;
api.graph = graphApi;
api.vasps = vaspsApi;
api.clusters = clustersApi;
api.alerts = alertsApi;
api.crossChain = crossChainApi;
api.intelligence = intelligenceApi;
api.reports = reportsApi;
api.search = searchApi;
api.admin = adminApi;

export default api;
