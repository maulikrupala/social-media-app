import { useState, useEffect } from "react";
import { mockFetchPosts } from "../mockData";
import { Post } from "../types";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await mockFetchPosts();
    console.log(data, "data-----");
    if (error) {
      setError(error.message);
    } else {
      setPosts(data || []); // Ensure `data` is not null.
    }
    setLoading(false);
  };

  // const createPost = async (title: string, content: string) => {
  //   const { data, error } = await supabase
  //     .from("posts")
  //     .insert([{ title, content }])
  //     .select(); // Ensure you return the inserted data.
  //   if (error) {
  //     setError(error.message);
  //     return null;
  //   }
  //   if (data && data.length > 0) {
  //     setPosts((prevPosts) => [data[0], ...prevPosts]);
  //     return data[0];
  //   }
  //   return null; // Handle the case where `data` is unexpectedly empty.
  // };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts };
};

export default usePosts;
