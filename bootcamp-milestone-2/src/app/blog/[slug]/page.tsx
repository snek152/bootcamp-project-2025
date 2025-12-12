import Link from "next/link";
import connectDB from "@/database/db";
import BlogSchema from "@/database/blogSchema";
import BlogComments from "@/app/lib/components/BlogComments";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string) {
  await connectDB();

  try {
    const blog: any = await BlogSchema.findOne({ slug }).lean().orFail();

    // Serialize comments to remove _id and convert dates
    const serializedComments = (blog.comments || []).map((comment: any) => ({
      user: comment.user,
      comment: comment.comment,
      time:
        comment.time instanceof Date
          ? comment.time.toISOString()
          : comment.time,
    }));

    return {
      ...blog,
      comments: serializedComments,
    };
  } catch (err) {
    console.log(`error: ${err}`);
    return null;
  }
}
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Link
          href="/blog"
          className="inline-block mb-6 text-cyan-400 hover:text-cyan-300 hover:underline"
        >
          ← Back to Blog
        </Link>
        <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
        <p className="text-gray-300">
          Sorry, the blog post you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      <Link
        href="/blog"
        className="inline-block mb-6 text-cyan-400 hover:text-cyan-300 hover:underline"
      >
        ← Back to Blog
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-white">{blog.title}</h1>

      <time
        dateTime={new Date(blog.date).toISOString()}
        className="block text-gray-400 text-sm mb-6"
      >
        Posted on{" "}
        {new Date(blog.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <img
        src={blog.image}
        alt={blog.image_alt}
        className="w-full rounded-lg object-cover mb-6"
      />

      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-200 text-lg leading-relaxed mb-4">
          {blog.description}
        </p>

        <div className="text-gray-300 leading-relaxed">{blog.content}</div>
      </div>

      <BlogComments blogSlug={slug} initialComments={blog.comments || []} />
    </article>
  );
}
