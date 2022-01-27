import { configureStore } from '@reduxjs/toolkit';
import BlogSlicer, { SetBlogData } from './Reducers/BlogSlicer';
import UserSlicer from './Reducers/UserSlicer';


export const store = configureStore({
    reducer: {
        UserDetails: UserSlicer,
        Blog: BlogSlicer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

