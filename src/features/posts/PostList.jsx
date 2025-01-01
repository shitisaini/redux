import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPostAsync, deletePostAsync, editPostAsync, postSlice } from './postSlice';

const PostList = () => {
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState(null);

    const handleAddPost = () => {
        dispatch(addPostAsync({ id: Date.now(), title, content }));
    };

    const handleEditPost = (post) => {
        setEditId(post.id);
        setTitle(post.title);
        setContent(post.content);
    };

    const handleSaveEdit = () => {
        dispatch(editPostAsync({ id: editId, title, content }));
        setEditId(null);
        setTitle('');
        setContent('');
    };

    const handleDeletePost = (postId) => {
        dispatch(deletePostAsync(postId));
    };

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => handleEditPost(post)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {editId ? (
                    <button onClick={handleSaveEdit} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Saving...' : 'Save Edit'}
                    </button>
                ) : (
                    <button onClick={handleAddPost} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Adding...' : 'Add Post'}
                    </button>
                )}
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
};

export default PostList;