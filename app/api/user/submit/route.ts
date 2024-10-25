import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();

    const { email, newAddress } = reqBody;

    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email },
      { address: newAddress },
      { new: true }
    );
    if (user) {
      return NextResponse.json(
        { message: `User ${email} & new address ${newAddress}` },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: `User ${email} not found` },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}
