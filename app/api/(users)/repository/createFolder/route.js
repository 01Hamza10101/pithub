import repository from '../../../models/repository';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { createFolder } from '../../../helper/gcs';
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
    const content = await createFolder(path);

    return NextResponse.json(
      { message: 'Folder created successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching file content:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
