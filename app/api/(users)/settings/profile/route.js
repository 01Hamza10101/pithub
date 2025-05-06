import User from '../../../models/user';
import connectToDatabase from '../../../db/connectdb';
import { verifyTokenFromRequest } from '../../../helper/VerifyToken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Verify authentication
    const reqUser = await verifyTokenFromRequest(request);
    if (!reqUser) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Parse and validate input
    const updateData = await request.json();
    

    // Verify user can only update their own profile
    if (updateData.profile.email !== reqUser.email) {
      return NextResponse.json(
        { error: 'You can only update your own profile' },
        { status: 403 }
      );
    }

    console.log(updateData.socialLinks)
    // Validate social links
    if (updateData.socialLinks) {
      const invalidLinks = updateData.socialLinks.filter(link => {
        if (!link) return false;
        try {
          new URL(link);
          return false;
        } catch {
          return true;
        }
      });

      if (invalidLinks.length > 0) {
        return NextResponse.json(
          { error: 'Invalid social links provided' },
          { status: 400 }
        );
      }
    }

    // Prepare update object
    const updateObject = {
      $set: {
        'profile.name': updateData.profile.name,
        'profile.bio': updateData.profile.bio || '',
        'profile.pronouns': updateData.profile.pronouns || 'Male',
        'activity.socialLinks': updateData.activity.socialLinks?.filter(link => link) || []
      }
    };

    // Add URL if provided
    if (updateData.url) {
      try {
        new URL(updateData.url);
        updateObject.$set['profile.url'] = updateData.url;
      } catch {
        return NextResponse.json(
          { error: 'Invalid profile URL' },
          { status: 400 }
        );
      }
    }

    console.log(updateObject)
    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { 'profile.email': reqUser.email },
      updateObject,
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

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        user: updatedUser, 
        message: 'Profile updated successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Profile update error:', error);
    
    // Handle duplicate key errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0].split('.')[1];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}