import { NextRequest, NextResponse } from "next/server";
import projectSchema from "@/database/projectSchema";
import connectDB from "@/database/db";

type IParams = {
  params: {
    slug: string;
  };
};

export async function GET(req: NextRequest, { params }: IParams) {
  await connectDB();
  const { slug } = params;

  try {
    const project = await projectSchema.findOne({ slug }).orFail();
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json("Project not found.", { status: 404 });
  }
}
