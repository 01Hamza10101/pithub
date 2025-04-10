import connectToDatabase from '../../db/connectdb';
import user from '../../models/user';
import { NextResponse } from 'next/server';
import { verifyTokenFromRequest } from '../../helper/VerifyToken';

export async function GET(request) {
  const req = await verifyTokenFromRequest(request);

  if (!req || !req.email) {
    return NextResponse.json({ error: 'Invalid or missing token.' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const currentUser = await user.findOne({ "profile.email": req.email }).select("-_id -security.password -__v");

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ user: currentUser }, { status: 200 });

  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
