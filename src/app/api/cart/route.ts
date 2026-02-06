import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    
    if (!token || !token.token) {
      return NextResponse.json(
        { status: 401, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token.token as string,
      },
    });

    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch cart" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}