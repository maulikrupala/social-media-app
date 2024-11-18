import { useQuery } from "@apollo/client";
import { AuthUser, Post } from "../types";
import { GET_POSTS } from "../graphql/graphql";
import PostCard from "../components/posts/PostCard";
import { supabase } from "../graphql/apollo-client";
import { useEffect, useState } from "react";

type FeedProps = {
  user: AuthUser;
};

export default function Feed({ user }: FeedProps) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch data from the "posts" table
        const { data, error } = await supabase.from("posts").select("*");

        if (error) {
          throw error; // Handle error
        }

        setData(data); // Update state with fetched data
      } catch (err: any) {
        setError(err.message); // Capture and set error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array to run on component mount

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  console.log(data && data, "data?.posts?");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data &&
        data?.map((post: Post) => (
          <PostCard key={post?.id} post={post} currentUser={user} />
        ))}
    </div>
  );
}
