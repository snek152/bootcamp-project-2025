import { Suspense } from "react";
import Tools from "../lib/components/Tools";
import LoadingSpinner from "../lib/components/LoadingSpinner";
import { Metadata } from "next";
import connectDB from "@/database/db";
import ProjectSchema from "@/database/projectSchema";
import AllProjectsClient from "@/app/lib/components/AllProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
};

async function getProjects() {
  await connectDB();

  try {
    const projects = await ProjectSchema.find().orFail();
    // Convert MongoDB documents to plain objects
    return projects.map((project) => ({
      title: project.title,
      slug: project.slug,
      subtitle: project.subtitle,
      description: project.description,
      image: project.image,
      skills: project.skills,
      link: project.link,
      github: project.github,
    }));
  } catch (err) {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="w-full grid gap-5 px-5 py-2 lg:py-5 grid-cols-2">
      <Tools />
      <Suspense
        fallback={<LoadingSpinner className="col-span-2 h-full mt-10" />}
      >
        <AllProjectsClient projects={projects} />
      </Suspense>
    </div>
  );
}
