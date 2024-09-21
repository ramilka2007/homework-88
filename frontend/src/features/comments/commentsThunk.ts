import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Comments} from "../../types";
import {isAxiosError} from "axios";


export const getComments = createAsyncThunk<Comments, string>(
    'comments/get-by-post-id',
    async (post_id: string) => {
        const {data: comments} = await axiosApi.get(`comments?post_id=${post_id}`);
        return comments ?? [];
    });

export const addComment = createAsyncThunk(
    'comment/add-by-post',
    async (data: {post_id: string, comment: string},  {getState, rejectWithValue }) => {
        const token = getState().users.user.token;
        try {
            if (token) {
                await axiosApi.post(
                    `comments?post_id=${data.post_id}`,
                    {text: data.comment},
                    {headers: {'Authorization': `Bearer ${token}`}});
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    });