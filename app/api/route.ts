import { NextRequest, NextResponse } from 'next/server';

// API route to get all experiments
export async function GET(request: NextRequest) {
  // This would normally fetch from a database
  // For now, return mock data
  const experiments = [
    {
      id: 'exp-001',
      name: 'AI Image Generator',
      description: 'Generate images using AI models',
      category: 'AI and machine learning',
      status: 'deployed',
    },
    {
      id: 'exp-002',
      name: 'E-Commerce API Gateway',
      description: 'RESTful API gateway for e-commerce',
      category: 'API integration',
      status: 'deployed',
    },
  ];

  return NextResponse.json({ experiments });
}

// POST route to create a new experiment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, description, category, technologyStack } = body;
    
    if (!name || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new experiment (in real app, this would save to DB)
    const newExperiment = {
      id: `exp-${Date.now()}`,
      name,
      description,
      category,
      technologyStack: technologyStack || [],
      status: 'draft',
      lastUpdated: new Date(),
      createdAt: new Date(),
      author: 'sarath',
      tags: [],
      deploymentHistory: [],
    };

    return NextResponse.json({ experiment: newExperiment }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
