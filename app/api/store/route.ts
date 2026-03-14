import { fetchVercelApi } from "@/lib/fetchVercelApi";
import { NextResponse } from "next/server";

export const GET = async () => {
    const response = await fetchVercelApi("/store/config");
    const data = await response.json();
    return NextResponse.json(data);
}
