import { NextResponse } from 'next/server';
import { RevivalScore } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { repoUrl, testCoveragePct = 80, readmeCompleteness = 90, commitRecencyDays = 180 } = body;

    // Algorithmic Score Calculation Logic
    const commitRecencyScore = Math.max(0, Math.min(100, Math.round(100 - commitRecencyDays / 10)));
    const testScore = Math.min(100, Math.max(0, testCoveragePct));
    const readmeScore = Math.min(100, Math.max(0, readmeCompleteness));
    const dependencyScore = 85;
    const architectureScore = 90;

    const overallScore = Math.round(
      commitRecencyScore * 0.2 +
      testScore * 0.3 +
      readmeScore * 0.2 +
      dependencyScore * 0.15 +
      architectureScore * 0.15
    );

    let effortEstimate: 'Surface Dig' | 'Moderate Excavation' | 'Deep Excavation' = 'Surface Dig';
    if (overallScore < 75 && overallScore >= 60) {
      effortEstimate = 'Moderate Excavation';
    } else if (overallScore < 60) {
      effortEstimate = 'Deep Excavation';
    }

    const calculatedScore: RevivalScore = {
      projectId: body.projectId || `proj_${Date.now()}`,
      overallScore,
      codeHealthScore: Math.round((testScore + architectureScore) / 2),
      docQualityScore: readmeScore,
      effortEstimate,
      requiredSkills: body.techStack || ['TypeScript'],
      lastComputedAt: new Date().toISOString(),
      subMetrics: {
        commitRecency: commitRecencyScore,
        testCoveragePct: testScore,
        dependencyFreshness: dependencyScore,
        openIssuesRatio: 88,
        readmeCompleteness: readmeScore,
        architectureStability: architectureScore,
      },
    };

    return NextResponse.json({
      success: true,
      data: calculatedScore,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
