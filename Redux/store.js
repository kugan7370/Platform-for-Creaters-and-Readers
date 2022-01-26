import { configureStore } from '@reduxjs/toolkit';
import UserSlicer from './Reducers/UserSlicer';

export const store = configureStore({
    reducer: {
        UserDetails: UserSlicer,
    }
})