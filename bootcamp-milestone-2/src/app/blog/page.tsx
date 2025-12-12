import connectDB from "@/database/db";
// import blogs from "../blogData";
import BlogPreview from "../lib/components/BlogPreview";
import Blog from "@/database/blogSchema";

async function getBlogs() {
  await connectDB(); // function from db.ts before

  try {
    // query for all blogs and sort by date
    const blogs = await Blog.find().sort({ date: -1 }).lean().orFail();
    return blogs;
  } catch (err) {
    return null;
  }
}
export default async function BlogList() {
  const blogs = await getBlogs();
  if (blogs === null || blogs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">No blogs found.</div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Blog</h1>
      {blogs.map((blog) => (
        <BlogPreview key={blog.slug} {...blog} />
      ))}
    </div>
  );
}
