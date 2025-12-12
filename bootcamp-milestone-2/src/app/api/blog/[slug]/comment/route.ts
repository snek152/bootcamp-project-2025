import { NextRequest, NextResponse } from "next/server";
import blogSchema from "@/database/blogSchema";
import connectDB from "@/database/db";

type IParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { slug } = await params;

  try {
    const body = await req.json();

    // validate body
    if (!body.user || !body.comment) {
      return NextResponse.json(
        { error: "User and comment are required" },
        { status: 400 }
      );
    }

    // create comment object
    const newComment = {
      user: body.user,
      comment: body.comment,
      time: new Date(),
    };

    // push comment to blog document
    const blog = await blogSchema
      .findOneAndUpdate(
        { slug },
        { $push: { comments: newComment } },
        { new: true }
      )
      .orFail();

    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
