import { NextResponse } from "next/server";
import { deleteTechStackItem, getAdminPin } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const masterPin = getAdminPin();

    if (!authHeader || authHeader !== `Bearer ${masterPin}`) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const ok = deleteTechStackItem(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Tech item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
