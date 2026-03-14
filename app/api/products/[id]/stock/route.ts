import { fetchVercelApi } from "@/lib/fetchVercelApi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const response = await fetchVercelApi(`/products/${id}/stock`, { cache: "no-store" });
    const data = await response.json();
    return NextResponse.json(data);
}
