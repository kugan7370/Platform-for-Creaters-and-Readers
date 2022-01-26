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
        }
    },
});

export const { SetBlogData } = BlogSlicer.actions;
export const Blogs = (state) => state.Blog.BlogData;

export default BlogSlicer.reducer;
