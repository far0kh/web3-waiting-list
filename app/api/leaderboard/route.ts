import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
// import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface UserScore {
  _id: string;
  email: string;
  address: string;
  hasTwitter: boolean;
  invited_by: string;
  friends: number;
  score: number;
}

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find().lean().sort({ email: 1 });

    const userScores: UserScore[] = users.map((user: any) => {
      const friends = users.filter((u: any) => u.invited_by === user._id.toString()).length;
      const score = (user.address ? (user.invited_by ? 30 : 10) : 5) + (user.twitter ? 30 : 0) + (friends * 30);
      return {
        _id: user._id,
        email: user.email,
        address: user.address,
        hasTwitter: user.twitter ? true : false,
        invited_by: user.invited_by,
        friends: friends + (user.invited_by ? 1 : 0),
        score,
      };
    });

    userScores.sort((a, b) => b.score - a.score);
    // res.status(200).json({ success: true, data: userScores });
    // response.send(users);
    return NextResponse.json({ success: true, data: userScores, status: 200 });
  } catch (error) {
    // response.status(500).send({ message: e.message });
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }

}
