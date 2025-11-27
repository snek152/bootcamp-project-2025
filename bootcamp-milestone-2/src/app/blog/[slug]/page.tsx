import Link from "next/link";
import Comment from "@/app/lib/components/Comment";
import connectDB from "@/database/db";
import BlogSchema from "@/database/blogSchema";

type Props = {
  params: { slug: string };
};

async function getBlog(slug: string) {
  await connectDB();

  try {
    const blog = await BlogSchema.findOne({ slug }).orFail();
    return blog;
  } catch (err) {
    console.log(`error: ${err}`);
    return null;
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = params;
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
        dateTime={blog.date.toString()}
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

      <div className="border-t border-gray-700 pt-6 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Comments ({blog.comments?.length || 0})
        </h2>
        {blog.comments && blog.comments.length > 0 ? (
          <div>
            {blog.comments.map((comment: any, index: number) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </article>
  );
}
