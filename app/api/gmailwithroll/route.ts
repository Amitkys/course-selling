import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    const { email, rollNumber } = await req.json();

  
    const user = await prisma.emailWithRoll.create({
      data: {
        email,
        rollNumber
      }
    });
  
    return NextResponse.json({ message: 'User created successfully', user });
  }
  