import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
// import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    let users = await User.find({}).sort({ score: -1 }).limit(3); //.toArray();
    // response.send(users);
    return NextResponse.json(
      // { message: `User ${email} & address ${user.address}` },
      { users },
      { status: 200 }
    );
  } catch (error) {
    // response.status(500).send({ message: e.message });
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }

}
