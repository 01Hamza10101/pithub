// pages/api/users/update-username.ts
import User from '../../../models/user';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { NextResponse } from 'next/server';
import {renamePath} from '@/app/api/helper/gcs';

export async function PUT(request) {
  try {
    await connectToDatabase();
    
    // Verify authentication - assuming verifyTokenFromRequest returns { email }
    const reqUser = await verifyTokenFromRequest(request);
    if (!reqUser || !reqUser.email) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const { currentUsername, newUsername } = await request.json();
    
    // Validate input
    if (!currentUsername || !newUsername) {
      return NextResponse.json(
        { error: 'Both current and new username are required' },
        { status: 400 }
      );
    }

    if (currentUsername === newUsername) {
      return NextResponse.json(
        { error: 'New username must be different from current username' },
        { status: 400 }
      );
    }

    // First find the user document to verify ownership
    const currentUserDoc = await User.findOne({ 
      'profile.username': currentUsername 
    });
    
    if (!currentUserDoc) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify user can only update their own username using email
    if (reqUser.email !== currentUserDoc.profile.email) {
      return NextResponse.json(
        { error: 'You can only update your own username' },
        { status: 403 }
      );
    }

    // Check if new username is available
    const existingUser = await User.findOne({ 'profile.username': newUsername });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    // Update username
    const updatedUser = await User.findOneAndUpdate(
      { 'profile.username': currentUsername },
      { $set: { 'profile.username': newUsername } },
      { 
        new: true,
        runValidators: true,
        projection: { 
          __v: 0, 
          'security.password': 0, 
          'security.sessions': 0 
        }
      }
    );
    await renamePath(currentUsername,newUsername)
    return NextResponse.json(
      { 
        user: updatedUser, 
        message: 'Username updated successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Username update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}