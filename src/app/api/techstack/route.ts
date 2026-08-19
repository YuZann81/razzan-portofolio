import { NextResponse } from "next/server";
import { getAllTechStack, saveTechStackItem, getAdminPin } from "@/lib/db";

export async function GET() {
  try {
    const items = getAllTechStack();
    return NextResponse.json({ success: true, items, data: items });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterPin = getAdminPin();

    if (!authHeader || authHeader !== `Bearer ${masterPin}`) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, iconName, level, proficiency, specialization, desc, sortOrder } = body;

    if (!name || !category) {
      return NextResponse.json({ success: false, error: "Name and category are required." }, { status: 400 });
    }

    const id = body.id || name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const saved = saveTechStackItem({
      id,
      name: String(name),
      category: category as "languages" | "systems" | "frontend",
      iconName: iconName || "TypeScriptIcon",
      level: level || "Expert",
      proficiency: Number(proficiency) || 90,
      specialization: specialization || "",
      desc: desc || "",
      sortOrder: Number(sortOrder) || 99,
    });

    return NextResponse.json({ success: true, item: saved, data: saved });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
