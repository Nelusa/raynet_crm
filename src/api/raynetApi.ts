import type { ApiResponse } from "@/types/api.ts";
import type { BusinessCase } from "@/types/business.ts";
import type { Filter } from "@/types/filters.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_EMAIL = import.meta.env.VITE_API_EMAIL;
const API_KEY = import.meta.env.VITE_API_KEY;
const INSTANCE_NAME = import.meta.env.VITE_INSTANCE_NAME;

const checkRequiredEnvVars = () => {
  const required = {
    VITE_API_BASE_URL: API_BASE_URL,
    VITE_API_EMAIL: API_EMAIL,
    VITE_API_KEY: API_KEY,
    VITE_INSTANCE_NAME: INSTANCE_NAME,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` + "Please check your .env.local file.",
    );
  }
};

checkRequiredEnvVars();

async function apiCall<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: "Basic " + btoa(`${API_EMAIL}:${API_KEY}`),
        "X-Instance-Name": INSTANCE_NAME,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API request failed with status ${response.status}`);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (err) {
    const error = err as Error;
    console.error("API call error:", error);
    return {
      data: [] as unknown as T,
      error: error.message || "Unknown error",
    };
  }
}

export const searchCompanies = async (
  searchTerm: string,
  offset: number = 0,
  limit: number = 20,
  filters: Filter = {},
): Promise<ApiResponse<BusinessCase[]>> => {
  const definedParams: Record<string, string> = {
    offset: offset.toString(),
    limit: limit.toString(),
  };

  if (searchTerm) {
    definedParams.fulltext = searchTerm;
  }

  if (filters.owner !== undefined) {
    definedParams.owner = filters.owner.toString();
  }

  try {
    const response = await apiCall<BusinessCase[]>("/company/", definedParams);
    return {
      data: response.data || [],
      totalItems: response.totalItems,
    };
  } catch (error) {
    console.error("API call error:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
