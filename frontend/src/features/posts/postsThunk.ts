import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import {GlobalError, PostForAdd, Posts} from "../../types";
import {isAxiosError} from "axios";


export const getPosts = createAsyncThunk<Posts>(
    'posts/get-all',
    async () => {
        const {data: posts} = await axiosApi.get(`posts` );
        return posts ?? [];
    });

export const getPostsById = createAsyncThunk<Posts, string>(
    'posts/get-by-id',
    async (id: string) => {
        const {data: post} = await axiosApi.get(`posts/${id}` );
        return post ?? null;
    });

export const addPost = createAsyncThunk<Posts, PostForAdd, { rejectValue: GlobalError }>(
    'posts/add',
    async (posts: PostForAdd, { getState, rejectWithValue }) => {
        const token = getState().users.user.token;
        try {
            if (token) {
                await axiosApi.post(`posts`, posts, {headers: {'Authorization': `Bearer ${token}`}});
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }

    });