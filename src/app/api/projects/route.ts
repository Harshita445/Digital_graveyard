import { NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get('district');
    const depth = searchParams.get('depth');
    const q = searchParams.get('q');
    const forkOnly = searchParams.get('forkOnly') === 'true';

    let projects = getAllProjects();

    if (district && district !== 'All') {
      projects = projects.filter((p) => p.district === district);
    }

    if (depth && depth !== 'All') {
      projects = projects.filter((p) => p.revivalScore.effortEstimate === depth);
    }

    if (forkOnly) {
      projects = projects.filter((p) => p.isForkFriendly);
    }

    if (q) {
      const lowerQ = q.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQ) ||
          p.description.toLowerCase().includes(lowerQ) ||
          p.techStack.some((t) => t.toLowerCase().includes(lowerQ))
      );
    }

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Project title is required' }, { status: 400 });
    }

    const created = createProject(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
