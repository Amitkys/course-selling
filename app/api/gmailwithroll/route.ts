import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    const { email, rollNumber } = await req.json();

  
    const user = await prisma.user.create({
        data: {
          email,
          rollNumber,
          isActive: true,
          name: null
        },
      });
  
    return NextResponse.json({ message: 'User created successfully', user });
  }
  