import React, { createContext, useContext, useEffect, useState } from "react";
import { deletePost, getPosts, getCategoties } from "../services/api";

const PostsContext = createContext();
export const usePosts = () => useContext(PostsContext);

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await getCategoties();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteAndUpdatePosts = async (postId) => {
    await deletePost(postId);
    setPosts((prev) =>
      prev.filter((post) =>
        post._id !== postId ? { ...post, isDeleted: true } : post
      )
    );
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        categories,
        setPosts,
        fetchPosts,
        deleteAndUpdatePosts,
        loading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsProvider;
