import { fetchVercelApi } from "@/lib/fetchVercelApi";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const { searchParams } = request.nextUrl;
    const response = await fetchVercelApi(`/products?${searchParams.toString()}`);
    const data = await response.json();
    return NextResponse.json(data);
}
