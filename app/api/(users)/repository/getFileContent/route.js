import repository from '../../../models/repository';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { getFileContent } from '../../../helper/gcs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Invalid path.' }, { status: 400 });
    }

    const reqUser = await verifyTokenFromRequest(request);
    if (!reqUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const content = await getFileContent(path);

    return NextResponse.json(
      { content, message: 'File content loaded successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching file content:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
