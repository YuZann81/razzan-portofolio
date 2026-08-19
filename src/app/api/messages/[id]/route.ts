import { NextResponse } from "next/server";
import { markMessageAsRead, deleteMessage, getAdminPin } from "@/lib/db";

export async function PUT(
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

    const body = await request.json();
    const read = body.read !== undefined ? Boolean(body.read) : true;

    const ok = markMessageAsRead(id, read);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, read });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

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

    const ok = deleteMessage(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
