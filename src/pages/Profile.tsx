import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { User } from "../App";
import PostCard from "../components/posts/PostCard";

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    user(id: $userId) {
      id
      displayName
      email
      posts {
        id
        content
        createdAt
      }
    }
  }
`;

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { userId: id },
  });

  if (loading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const profile = data.user;

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{profile.displayName}</h2>
        <p className="text-gray-600">{profile.email}</p>
      </div>
      <h3 className="text-xl font-semibold mb-4">Posts</h3>
      <div className="space-y-6">
        {/* {profile?.posts?.map((post: any) => (
          <PostCard
            key={post.id}
            post={{ ...post, user: profile }}
            currentUser={user}
          />
        ))} */}
      </div>
    </div>
  );
}
