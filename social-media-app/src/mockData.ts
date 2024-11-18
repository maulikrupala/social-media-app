import { Post } from "./types";

export const dummyPosts: Post[] = [
  {
      id: 1, title: "First Post", content: "This is the first post",
      created_at: ""
  },
  {
      id: 2, title: "Second Post", content: "This is the second post",
      created_at: ""
  },
  {
      id: 3, title: "Third Post", content: "This is the third post",
      created_at: ""
  },
];

export const mockFetchPosts = async (): Promise<{
  data: Post[] | null;
  error: Error | null;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: dummyPosts, error: null });
    }, 500); // Simulate network delay
  });
};

export const mockCreatePost = async (
  title: string,
  content: string
): Promise<{ data: Post[] | null; error: Error | null }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPost: Post = {
          id: Date.now(), title, content,
          created_at: ""
      };
      resolve({ data: [newPost], error: null });
    }, 500); // Simulate network delay
  });
};
