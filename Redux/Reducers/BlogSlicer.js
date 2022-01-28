import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    BlogData: null,
};

const BlogSlicer = createSlice({
    name: "Blog",
    initialState,
    reducers: {
        SetBlogData: (state, actions) => {
            state.BlogData = actions.payload.BlogDatas;
        },
        UnSetBlogData: (state) => {
            state.BlogData = null;
        }
    },
});

export const { SetBlogData } = BlogSlicer.actions;
export const { UnSetBlogData } = BlogSlicer.actions;
export const GetBlogs = (state) => state.Blog.BlogData;

export default BlogSlicer.reducer;
