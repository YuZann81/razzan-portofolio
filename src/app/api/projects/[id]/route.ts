import { NextResponse } from "next/server";
import { getProjectBySlug, saveProject, deleteProject } from "@/lib/db";
import { Project } from "@/data/works";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = getProjectBySlug(id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch project." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updateData: Partial<Project> = await request.json();
    const existing = getProjectBySlug(id);

    if (!existing) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }

    const merged: Project = { ...existing, ...updateData };
    const saved = saveProject(merged);
    return NextResponse.json({ success: true, data: saved });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteProject(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Project deleted." });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete project." }, { status: 500 });
  }
}
