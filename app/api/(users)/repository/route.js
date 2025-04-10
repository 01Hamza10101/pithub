// pages/api/repositories/index.js
import connectToDatabase from '../../db/connectdb';
import Repository from '../../models/repository';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import { verifyTokenFromRequest } from '../../helper/VerifyToken';

export async function GET(request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' },{ status: 405 });
  }

  try {
    await connectToDatabase();

    const repositories = await Repository.find({});
    return NextResponse.json({ repositories },{ status: 200 });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' },{ status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const {name, status, description} = await request.json();
    const req = await verifyTokenFromRequest(request);
    const user = await User.findOne({ "profile.email": req.email });
   
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
   
    const repository = new Repository({
      name:`${user.profile.username}/${name.trim()}`,
      status,
      description,
      stars: 0,
      views: 0,
      branches: ['main'],
      commits: []
    });
    
    await user.updateOne({ $push: { 'activity.repositories': repository.name } });
    await repository.save();
    return NextResponse.json({ message: 'Repository created successfully' },{ status: 201 });
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' },{ status: 500 });
  }
}
