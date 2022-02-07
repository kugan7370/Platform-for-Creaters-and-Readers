import { configureStore } from '@reduxjs/toolkit';
import BlogSlicer, { SetBlogData } from './Reducers/BlogSlicer';
// import SignInUserBlogSlicer from './Reducers/SignInUserBlogSlicer';
// import UserFollowSlicer from './Reducers/UserFollowSlicer';
import UserSlicer from './Reducers/UserSlicer';


export const store = configureStore({
    reducer: {
        UserDetails: UserSlicer,
        Blog: BlogSlicer,
        // Follows: UserFollowSlicer,
        // SignInBlogs: SignInUserBlogSlicer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

