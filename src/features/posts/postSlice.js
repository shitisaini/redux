import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, deletePost, editPost } from './postAPI';

// Async thunk to add a post
export const addPostAsync = createAsyncThunk(
    'posts/addPost',
    async (post, { rejectWithValue }) => {
        try {
            const response = await addPost(post);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editPostAsync = createAsyncThunk(
    'posts/editPost',
    async (post, { rejectWithValue }) => {
        try {
            const response = await editPost(post);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk to delete a post
export const deletePostAsync = createAsyncThunk(
    'posts/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await deletePost(postId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [
            { id: '1', title: 'First Post!', content: 'Hello!' },
            { id: '2', title: 'Second Post', content: 'More text' }
        ],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPostAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.posts.push(action.payload);
            })
            .addCase(addPostAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(editPostAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editPostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(editPostAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deletePostAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase(deletePostAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default postSlice.reducer;