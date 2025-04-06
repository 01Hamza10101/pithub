// pages/api/repositories/index.js
import connectToDatabase from '../../db/connectdb';
import user from '../../models/user';
import { NextResponse } from 'next/server';

export default async function GET(request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' },{ status: 405 });
  }
  try {
    await connectToDatabase();
    const newUser = await user.find({});
    return NextResponse.json({ user:newUser },{ status: 200 });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' },{ status: 500 });
  }
}
