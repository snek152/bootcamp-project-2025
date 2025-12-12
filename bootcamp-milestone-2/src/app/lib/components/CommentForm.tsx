"use client";
import { useState } from "react";

type CommentFormProps = {
  blogSlug: string;
  onCommentAdded: () => void;
};

export default function CommentForm({
  blogSlug,
  onCommentAdded,
}: CommentFormProps) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // validate inputs
    if (!user.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/blog/${blogSlug}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // reset form
      setUser("");
      setComment("");
      onCommentAdded();
    } catch (err) {
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label htmlFor="user" className="block text-white mb-2">
          Name
        </label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-white mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 resize-none"
          placeholder="Write your comment..."
          rows={4}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
