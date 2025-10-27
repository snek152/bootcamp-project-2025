import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/app/blogData";

export default function BlogPreview({
  title,
  date,
  description,
  image,
  imageAlt,
  slug,
}: Blog) {
  return (
    <article className="border border-gray-700 rounded-lg p-4 mb-4 flex gap-4 items-start hover:shadow-lg hover:border-gray-600 transition-all bg-gray-900/50">
      <img
        src={image}
        alt={imageAlt}
        width={160}
        height={120}
        className="rounded-md object-cover"
      />
      <div className="flex-1">
        <h2 className="m-0 mb-2 text-xl font-semibold text-white">{title}</h2>
        <time dateTime={date} className="block text-gray-400 text-sm mb-2">
          {new Date(date).toLocaleDateString()}
        </time>
        <p className="m-0 text-gray-300 mb-3">{description}</p>
        <Link
          href={`/blog/${slug}`}
          className="inline-block text-cyan-400 no-underline hover:text-cyan-300 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
