const BASE_URL = "https://vercel-swag-store-api.vercel.app/api";

export const fetchVercelApi = (path: string, options?: RequestInit) => {
    const url = `${BASE_URL}${path}`;
    const headers = new Headers(options?.headers);
    headers.set("x-vercel-protection-bypass", process.env.VERCEL_SWAG_STORE_API_BYPASS_TOKEN ?? "");
    return fetch(url, { ...options, headers });
}