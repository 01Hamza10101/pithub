// pages/api/repositories/index.js
import connectToDatabase from '../../db/connectdb';
import ContributionRecord from '../../models/commits';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { repositories } = await request.json();
    const repos = await ContributionRecord.find({ name: { $in: repositories } }).select('-__v -_id');
    return NextResponse.json({ repositories:repos , message:"contribution data is loaded." },{ status: 200 });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' },{ status: 500 });
  }
}
