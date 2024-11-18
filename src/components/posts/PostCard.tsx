import { User } from "../../App";
import { supabase } from "../../graphql/apollo-client";
import { Post } from "../../types";


type PostCardProps = {
  post: Post;
  currentUser: User;
  fetchPost: () => void;
};

export default function PostCard({ post, currentUser, fetchPost }: PostCardProps) {
  console.log(post.created_at, "dates");
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

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmation) return;

    try {
      const { error } = await supabase.from("posts").delete().eq("id", post.id); // Ensure to match the correct ID

      if (error) {
        console.error("Error deleting post:", error.message);
        alert("Failed to delete the post. Please try again.");
        return;
      }

      alert("Post deleted successfully!");
      fetchPost(); // Call the callback to refresh the posts list
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="mb-3">
        <img
          src={post.images || "/images/no_image.png"}
          alt={post.title}
          width={130}
          height={130}
          // className="rounded-lg object-cover"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <h3 className="text-[#6366F1] font-semibold hover:text-[#5558E3] transition-colors">
            {post.title}
          </h3>
          <span className="text-gray-500 text-[8px]">
            {formatDate(post.created_at)}
          </span>
        </div>
        <p className="text-gray-800 text-sm">{post.content}</p>
        {currentUser.id === post.user_id && (
          <div className="flex justify-end pt-2">
            <button className="text-red-500 text-sm hover:text-red-700 transition-colors" onClick={handleDelete} >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
