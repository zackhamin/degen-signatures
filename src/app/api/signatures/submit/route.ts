import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Here we'll eventually send this to the blockchain
    // For now, just log and return the data
    console.log('Signature submission:', data);

    // Mock successful response
    return NextResponse.json({ 
      success: true, 
      message: 'Signature submitted successfully',
      data: {
        timestamp: new Date().toISOString(),
        ...data
      }
    });

  } catch (error) {
    console.error('Error submitting signature:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit signature' },
      { status: 500 }
    );
  }
}