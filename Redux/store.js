import { configureStore } from '@reduxjs/toolkit';
import BlogSlicer from './Reducers/BlogSlicer';
import UserSlicer from './Reducers/UserSlicer';

export const store = configureStore({
    reducer: {
        UserDetails: UserSlicer,
        Blog: BlogSlicer,
    }
})