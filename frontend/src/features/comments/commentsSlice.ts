import {createSlice} from '@reduxjs/toolkit';
import {Comments} from '../../types';
import {addComment, getComments} from './commentsThunk';


interface artistsState {
    comments: Comments[];
    isLoading: boolean;
    addLoading: boolean;
    isError: boolean;
}

const initialState: artistsState = {
    comments: [],
    isLoading: false,
    addLoading: false,
    isError: false,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getComments.fulfilled, (state, {payload: comments}) => {
            state.isLoading = false;
            state.comments = comments;
        }).addCase(getComments.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(addComment.pending, (state) => {
            state.addLoading = true;
            state.isError = false;
        }).addCase(addComment.fulfilled, (state) => {
            state.addLoading = false;
        }).addCase(addComment.rejected, (state) => {
            state.addLoading = false;
            state.isError = true;
        });
    },
    selectors: {
        selectComments: (state) => state.comments,
        selectIsLoadingComments: (state) => state.isLoading,
        selectAddLoadingComments: (state) => state.addLoading,
    }
});


export const commentsReducer = commentsSlice.reducer;
export const {selectComments, selectIsLoadingComments, selectAddLoadingComments} = commentsSlice.selectors