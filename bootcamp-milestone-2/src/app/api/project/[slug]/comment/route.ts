import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

type IParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { slug } = await params;

  try {
    // Parse request body
    const body = await req.json();
    const { user, comment } = body;

    // Validate input
    if (!user || !comment) {
      return NextResponse.json(
        { error: "User and comment are required" },
        { status: 400 }
      );
    }

    // Create new comment object
    const newComment = {
      user,
      comment,
      time: new Date(),
    };

    // Find project and add comment
    const project = await Project.findOneAndUpdate(
      { slug },
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (err) {
    console.error("Error adding comment:", err);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
