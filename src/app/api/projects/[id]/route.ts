import { NextResponse } from 'next/server';
import { getProjectById, updateProjectStatus, addProvenanceNode, getAllProjects } from '@/lib/db';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ id: p.id }));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = getProjectById(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Artifact not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (body.status) {
      const updated = updateProjectStatus(params.id, body.status);
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Artifact not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    }

    if (body.provenanceNode) {
      const updated = addProvenanceNode(params.id, body.provenanceNode);
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Artifact not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: false, error: 'No valid action provided' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
