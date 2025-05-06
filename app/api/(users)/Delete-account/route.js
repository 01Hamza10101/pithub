import { NextResponse } from 'next/server';
import { verifyTokenFromRequest } from '../../helper/VerifyToken'; // your JWT verification util
import connectDB from '../../db/connectdb'; // DB connection
import User from '../../models/user'; // User model
import Repository from '../../models/repository'; // Repository model
import ContributionRecord from '../../models/commits'; // Commit model
import { deletePath } from '../../helper/gcs'; // GCS deletion util

export async function DELETE(req) {
  try {
    await connectDB();

    const decoded = await verifyTokenFromRequest(req);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = decoded.userId;

    // Delete user
    await User.findByIdAndDelete(userId);

    // Delete all repositories belonging to the user
    await Repository.deleteMany({ name: new RegExp(`^${userId}/`) });

    // Delete all contribution records for the user
    await ContributionRecord.deleteMany({ name: new RegExp(`^${userId}/`) });

    // Delete user's folder in GCS
    await deletePath(userId, 'folder');

    return NextResponse.json({ message: 'Account and associated data deleted successfully' }, { status: 200 });

  } catch (err) {
    console.error('Delete account error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
