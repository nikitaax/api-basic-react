import React from "react";
import { useState, useEffect } from "react";
import { getPosts, deletePost, updatePost } from "../services/PostService";
import Button from "react-bootstrap/Button";
import PostForm from "./PostForm";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getPosts()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startEditing = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1> Posts</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2> {post.title}</h2>
            <p> {post.body}</p>
            <Button onClick={() => startEditing(post)} variant="secondary">
              Edit Post
            </Button>
            <Button onClick={() => handleDelete(post.id)} variant="danger">
              Delete Post
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
