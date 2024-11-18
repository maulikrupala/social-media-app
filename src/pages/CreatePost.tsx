import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../types"; // Assuming AuthUser contains user details like id and displayName
import { supabase } from "../graphql/apollo-client";

type CreatePostProps = {
  user: AuthUser;
};

export default function CreatePost({ user }: CreatePostProps) {
  console.log(user, "user---");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (image) {
        const { data, error } = await supabase.storage
          .from("images") // Replace "images" with your storage bucket name
          .upload(`public/${Date.now()}-${image.name}`, image);

        if (error) throw error;

        // Get public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(data.path);

        imageUrl = publicUrlData.publicUrl;
      }

      // Insert post into the database, including author_id (or user_id)
      const { error: insertError } = await supabase.from("posts").insert({
        title,
        user_id: user.id, // Ensure you set the author_id or user_id to the current user's ID
        content,
        images: imageUrl, // Save the image URL in the table
      });

      if (insertError) throw insertError;
      alert("Post created successfully!");
      navigate("/"); // Redirect to the home page or posts list
    } catch (err: any) {
      console.error("Error creating post:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter a title for your post"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="What's on your mind?"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
