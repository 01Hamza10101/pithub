import repository from '../../../models/repository';
import User from '../../../models/user';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();

    const { name } = await request.json();
    const reqUser = await verifyTokenFromRequest(request);

    if (!reqUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const repo = await repository.findOne({ name });
    if (!repo) {
      return NextResponse.json({ error: 'Repository not found.' }, { status: 404 });
    }

    const user = await User.findOne({ "profile.email": reqUser.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const index = user.activity.starred.indexOf(repo.name);
    let starred;

    if (index === -1) {
      // Not yet starred → star it
      user.activity.starred.push(repo.name);
      repo.stars += 1;
      starred = true;
    } else {
      // Already starred → unstar it
      user.activity.starred.splice(index, 1);
      repo.stars = Math.max(repo.stars - 1, 0); // Avoid negative stars
      starred = false;
    }

    await user.save();
    await repo.save();

    return NextResponse.json(
      {
        starred,
        message: `Repository ${starred ? 'starred' : 'unstarred'} successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating repository:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
