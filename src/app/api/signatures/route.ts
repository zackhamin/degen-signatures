import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Here we'll eventually fetch from the blockchain
    // For now, return mock data
    const mockSignatures = [
      {
        address: "0x1234...",
        name: "Vitalik",
        country: "ETH Land",
        timestamp: new Date().toISOString()
      },
      // Add more mock signatures as needed
    ];

    return NextResponse.json({ 
      success: true, 
      data: mockSignatures 
    });

  } catch (error) {
    console.error('Error fetching signatures:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch signatures' },
      { status: 500 }
    );
  }
}