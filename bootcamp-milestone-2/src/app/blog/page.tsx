import blogs from "../blogData";
import BlogPreview from "../lib/components/BlogPreview";

export default function BlogList() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Blog</h1>
      {blogs.map((blog) => (
        <BlogPreview key={blog.slug} {...blog} />
      ))}
    </div>
  );
}
