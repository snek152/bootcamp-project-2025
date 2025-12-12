"use client";

import { useState } from "react";

type Props = {
  projectSlug: string;
  onCommentAdded: () => void;
};

export default function ProjectCommentForm({
  projectSlug,
  onCommentAdded,
}: Props) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!user.trim() || !comment.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/project/${projectSlug}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, comment }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Clear form
      setUser("");
      setComment("");

      // Trigger refresh of comments
      onCommentAdded();
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">Leave a Comment</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">{error}</div>
      )}

      <div className="mb-4">
        <label htmlFor="user" className="block text-cyan-400 mb-2">
          Name
        </label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-cyan-400"
          placeholder="Your name"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-cyan-400 mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-cyan-400"
          placeholder="Share your thoughts..."
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-cyan-400 text-gray-900 font-semibold rounded hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
