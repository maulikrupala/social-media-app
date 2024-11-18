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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg">
      <h2 className="text-4xl font-bold mb-8">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            placeholder="Enter a title for your post"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            placeholder="What's on your mind?"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-gray-50 file:text-gray-700
              hover:file:bg-gray-100"
          />
        </div>
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6366F1] text-white py-3 px-4 rounded-md hover:bg-[#5558E3] transition duration-300 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
