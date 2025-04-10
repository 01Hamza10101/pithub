import repository from '../../../models/repository';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { repositories } = await request.json();

    if (!repositories || !Array.isArray(repositories)) {
      return NextResponse.json({ error: 'Invalid repositories list.' }, { status: 400 });
    }

    const reqUser = await verifyTokenFromRequest(request);
    if (!reqUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Match repositories using $in
    const repos = await repository.find({ name: { $in: repositories } }).select('-__v -_id');

    return NextResponse.json(
      { repositories: repos, message: 'Repositories loaded successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
