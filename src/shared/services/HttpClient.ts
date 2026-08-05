const BASE_URL = 'http://localhost:3000/api/v1';
const TOKEN_KEY = 'auth_token';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class HttpClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = params ? `${BASE_URL}${path}?${new URLSearchParams(params)}` : `${BASE_URL}${path}`;
    return this.request<T>('GET', url);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', `${BASE_URL}${path}`, body);
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', `${BASE_URL}${path}`, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', `${BASE_URL}${path}`);
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (response.status === 429) {
      throw new Error('Muitas requisições. Aguarde alguns minutos e tente novamente.');
    }

    const json: ApiResponse<T> = await response.json();

    if (!json.success) {
      throw new Error(json.message || 'Erro na requisição');
    }

    return json.data as T;
  }
}

export const httpClient = new HttpClient();
