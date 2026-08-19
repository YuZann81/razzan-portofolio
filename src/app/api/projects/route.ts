import { NextResponse } from "next/server";
import { getAllProjects, saveProject } from "@/lib/db";
import { Project } from "@/data/works";

export async function GET() {
  try {
    const projects = getAllProjects();
    return NextResponse.json({ success: true, projects, data: projects });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const projectData: Project = await request.json();
    if (!projectData.title || !projectData.slug) {
      return NextResponse.json({ success: false, error: "Title and slug are required." }, { status: 400 });
    }

    const saved = saveProject(projectData);
    return NextResponse.json({ success: true, project: saved, data: saved });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to save project." }, { status: 500 });
  }
}
