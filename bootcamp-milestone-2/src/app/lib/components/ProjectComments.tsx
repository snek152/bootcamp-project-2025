"use client";

import { useState } from "react";
import Comment from "./Comment";
import ProjectCommentForm from "./ProjectCommentForm";
import { IComment } from "@/database/projectSchema";

type Props = {
  projectSlug: string;
  initialComments: IComment[];
};

export default function ProjectComments({
  projectSlug,
  initialComments,
}: Props) {
  const [comments, setComments] = useState<IComment[]>(initialComments);

  const refreshComments = async () => {
    try {
      const response = await fetch(`/api/project/${projectSlug}`);
      if (response.ok) {
        const project = await response.json();
        setComments(project.comments || []);
      }
    } catch (err) {
      console.error("Failed to refresh comments:", err);
    }
  };

  return (
    <div>
      <ProjectCommentForm
        projectSlug={projectSlug}
        onCommentAdded={refreshComments}
      />

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">
          Comments ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment: any, index: number) => (
            <Comment key={index} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
