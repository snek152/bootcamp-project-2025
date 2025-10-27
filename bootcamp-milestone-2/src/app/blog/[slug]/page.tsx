import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/app/blogData";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
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

      <time dateTime={blog.date} className="block text-gray-400 text-sm mb-6">
        Posted on{" "}
        {new Date(blog.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <img
        src={blog.image}
        alt={blog.imageAlt}
        width={800}
        height={500}
        className="w-full rounded-lg object-cover mb-6"
      />

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-200 text-lg leading-relaxed mb-4">
          {blog.description}
        </p>

        <p className="text-gray-300 leading-relaxed">
          This is where the full blog post content would go. You can add more
          paragraphs, headings, lists, code blocks, and other content here.
        </p>

        <p className="text-gray-300 leading-relaxed">
          For now, this is a placeholder. In a real blog, you might store the
          full content in markdown files, a CMS, or add a `content` field to
          your blog data structure.
        </p>
      </div>
    </article>
  );
}
