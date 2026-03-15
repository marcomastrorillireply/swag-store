import type { Store } from "@/types";
import { fetchVercelApi } from "./fetchVercelApi";

export const fetchStore = async (): Promise<Store> => {
    const response = await fetchVercelApi("/store/config");
    const { data } = await response.json();
    return data as Store;
};