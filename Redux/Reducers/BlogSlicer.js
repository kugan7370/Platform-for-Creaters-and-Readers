import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    BlogData: null,
    FollowingBlogs: null,
};

const BlogSlicer = createSlice({
    name: "Blog",
    initialState,
    reducers: {
        SetBlogData: (state, actions) => {
            state.BlogData = actions.payload.BlogDatas;
        },
        SetFollowingBlog: (state, actions) => {
            state.FollowingBlogs = actions.payload.FollowingBlog;
        }
    },
});

export const { SetBlogData, SetFollowingBlog } = BlogSlicer.actions;
// export const { UnSetBlogData } = BlogSlicer.actions;
export const GetBlogs = (state) => state.Blog.BlogData;
export const GetFollowingBlogs = (state) => state.Blog.FollowingBlogs;

export default BlogSlicer.reducer;
