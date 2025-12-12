"use client";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { IComment } from "@/database/blogSchema";

type BlogCommentsProps = {
  blogSlug: string;
  initialComments: IComment[];
};

export default function BlogComments({
  blogSlug,
  initialComments,
}: BlogCommentsProps) {
  const [comments, setComments] = useState<IComment[]>(initialComments);

  const refreshComments = async () => {
    try {
      const response = await fetch(`/api/blog/${blogSlug}`);
      if (response.ok) {
        const blog = await response.json();
        setComments(blog.comments || []);
      }
    } catch (err) {
      console.error("Failed to refresh comments:", err);
    }
  };

  return (
    <div className="border-t border-gray-700 pt-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Comments ({comments.length})
      </h2>

      <CommentForm blogSlug={blogSlug} onCommentAdded={refreshComments} />

      {comments.length > 0 ? (
        <div>
          {comments.map((comment: IComment, index: number) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}
