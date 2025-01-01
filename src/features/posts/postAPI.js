import { createAsyncThunk } from "@reduxjs/toolkit";

// Simulate an API call to add a post
export async function addPost(post) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (!post.title || !post.content) {
          reject(new Error('Title and content are required'));
        } else {
          resolve({ data: post });
        }
      }, 500)
    );
  }

  export async function editPost(post) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (!post.id || !post.title || !post.content) {
          reject(new Error('ID, title, and content are required'));
        } else {
          resolve({ data: post });
        }
      }, 500)
    );
  }
  
  // Simulate an API call to delete a post
  export async function deletePost(postId) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (!postId) {
          reject(new Error('Post ID is required'));
        } else {
          resolve({ data: postId });
        }
      }, 500)
    );
  }
  