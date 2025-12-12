import { IComment } from "@/database/blogSchema";

type CommentProps = {
  comment: {
    user: string;
    comment: string;
    time: Date | string;
  };
};

function parseCommentTime(time: Date | string): string {
  const date = new Date(time);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${month} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 mb-3 bg-gray-900/30">
      <h4 className="text-white font-semibold mb-1">{comment.user}</h4>
      <p className="text-gray-300 mb-2">{comment.comment}</p>
      <span className="text-gray-500 text-sm">
        {parseCommentTime(comment.time)}
      </span>
    </div>
  );
}
