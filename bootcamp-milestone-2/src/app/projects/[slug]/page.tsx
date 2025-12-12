import connectDB from "@/database/db";
import ProjectSchema from "@/database/projectSchema";
import ProjectComments from "@/app/lib/components/ProjectComments";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProject(slug: string) {
  await connectDB();

  try {
    const project: any = await ProjectSchema.findOne({ slug }).lean().orFail();

    // Serialize comments to remove _id and convert dates
    const serializedComments = (project.comments || []).map((comment: any) => ({
      user: comment.user,
      comment: comment.comment,
      time:
        comment.time instanceof Date
          ? comment.time.toISOString()
          : comment.time,
    }));

    return {
      ...project,
      comments: serializedComments,
    };
  } catch (err) {
    console.log(`error: ${err}`);
    return null;
  }
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-cyan-400 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-300">
            Sorry, the project you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            {project.title}
          </h1>
          {project.subtitle && (
            <h2 className="text-2xl text-gray-400 mb-4">{project.subtitle}</h2>
          )}
        </div>

        {/* Project Image */}
        <div className="mb-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Project Description */}
        <div className="mb-8 text-gray-300 leading-relaxed">
          <p>{project.description}</p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-700 text-cyan-400 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project.link || project.github) && (
          <div className="mb-8 flex gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-400 text-gray-900 font-semibold rounded hover:bg-cyan-300 transition-colors"
              >
                View Live Project
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 text-cyan-400 font-semibold rounded hover:bg-gray-600 transition-colors border border-cyan-400"
              >
                View on GitHub
              </a>
            )}
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <ProjectComments
            projectSlug={slug}
            initialComments={project.comments || []}
          />
        </div>
      </div>
    </main>
  );
}
