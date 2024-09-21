import {createSlice} from '@reduxjs/toolkit';
import {Posts} from '../../types';
import {addPost, getPosts, getPostsById} from "./postsThunk";


interface artistsState {
    posts: Posts[];
    post: Posts | null;
    isLoading: boolean;
    addLoading: boolean;
    isError: boolean;
}

const initialState: artistsState = {
    posts: [],
    post: null,
    isLoading: false,
    addLoading: false,
    isError: false,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getPosts.fulfilled, (state, {payload: posts}) => {
            state.isLoading = false;
            state.posts = posts;
        }).addCase(getPosts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getPostsById.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getPostsById.fulfilled, (state, {payload: post}) => {
            state.isLoading = false;
            state.posts = [];
            state.post = post;
        }).addCase(getPostsById.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(addPost.pending, (state) => {
            state.addLoading = true;
            state.isError = false;
        }).addCase(addPost.fulfilled, (state) => {
            state.addLoading = false;
        }).addCase(addPost.rejected, (state) => {
            state.addLoading = false;
            state.isError = true;
        });
    },
    selectors: {
        selectPosts: (state) => state.posts,
        selectPost: (state) => state.post,
        selectIsLoadingPosts: (state) => state.isLoading,
        selectAddLoadingPosts: (state) => state.addLoading
    }
});


export const postsReducer = postsSlice.reducer;
export const {selectPosts, selectPost, selectIsLoadingPosts, selectAddLoadingPosts} = postsSlice.selectors