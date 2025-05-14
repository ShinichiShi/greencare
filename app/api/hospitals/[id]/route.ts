import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Validate hospital ID
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Find hospital by ID
    const hospital = await db.collection("hospitals").findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // Remove sensitive information
    const { password, ...safeHospital } = hospital;
    
    return NextResponse.json({
      success: true,
      hospital: safeHospital
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch hospital data' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate hospital ID
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("greencare");
    
    // Disallow password update through this endpoint
    if (body.password) {
      delete body.password;
    }
    
    // Update hospital data
    const result = await db.collection("hospitals").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...body,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // Get updated hospital data
    const updatedHospital = await db.collection("hospitals").findOne({ 
      _id: new ObjectId(id) 
    });
    
    // Remove sensitive information
    const { password, ...safeHospital } = updatedHospital;
    
    return NextResponse.json({
      success: true,
      hospital: safeHospital
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to update hospital data' },
      { status: 500 }
    );
  }
}