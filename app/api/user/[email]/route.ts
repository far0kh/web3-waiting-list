import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
// import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        // { message: `User ${email} & address ${user.address}` },
        { user },
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
