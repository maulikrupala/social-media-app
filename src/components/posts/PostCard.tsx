import { Link } from "react-router-dom";
import { User } from "../../App";
import { Post } from "../../types";



type PostCardProps = {
  post: Post;
  currentUser: User;
};

export default function PostCard({ post, currentUser }: PostCardProps) {
    
   console.log(post.created_at, "dates")
   function formatDate(dates: Date) {
     const date = new Date(dates); // Parse the ISO date string
     const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
     const year = date.getFullYear();

     // Format time
     const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero
     const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero
     const seconds = String(date.getSeconds()).padStart(2, "0"); // Add leading zero

     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`; // Format as dd/mm/yyyy
   }

   console.log(currentUser.id, "currentUser.id");
   console.log(post.id, "post.id");

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div
          className="font-semibold text-indigo-600"
        >
          {post.title}
        </div>
        <span className="text-gray-500 text-sm">
          {formatDate(post.created_at)}
        </span>
      </div>
      <p className="text-gray-800">{post.content}</p>
      {currentUser.id === post.user_id && (
        <div className="mt-4 flex justify-end">
          <button className="text-red-600 hover:text-red-800 transition">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
