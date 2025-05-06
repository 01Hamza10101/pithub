import repository from '../../../models/repository';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { SaveChanges } from '../../../helper/gcs';
import { NextResponse } from 'next/server';
import ContributionRecord from '../../../models/commits'; // your schema

export async function POST(request) {
  try {
    await connectToDatabase();

    const { path, content, message = "Updated file content" } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Invalid path.' }, { status: 400 });
    }

    const reqUser = await verifyTokenFromRequest(request);
    if (!reqUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await SaveChanges(path, content);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day

    let record = await ContributionRecord.findOne({ name: path.split('/').slice(0,2).join('/') });

    if (!record) {
      // Create new record if not exists
      record = new ContributionRecord({
        name: path.split('/').slice(0,2).join('/'),
        contributions: [{ date: today, count: 1 }]
      });
    } else {
      // Check if contribution for today exists
      const existing = record.contributions.find(c => {
        const cDate = new Date(c.date);
        cDate.setHours(0, 0, 0, 0);
        return cDate.getTime() === today.getTime();
      });

      if (existing) {
        existing.count += 1;
      } else {
        record.contributions.push({ date: today, count: 1 });
      }

      record.updatedAt = new Date();
    }

    await record.save();

    return NextResponse.json(
      { message: 'File content committed and contribution recorded.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating contribution record:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
