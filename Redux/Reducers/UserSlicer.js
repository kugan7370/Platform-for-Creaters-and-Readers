import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    SignInUserDetails: null
};

const UserSlicer = createSlice({
    name: "UserDetails",
    initialState,
    reducers: {
        SetSignInUsers: (state, actions) => {
            state.SignInUserDetails = actions.payload.SignInUserDetails;
        },
        SetSignOut: (state) => {
            state.SignInUserDetails = null;
        }

    },
});

export const { SetSignInUsers, SetSignOut } = UserSlicer.actions;
export const SignInUser = (state) => state.UserDetails.SignInUserDetails;

export default UserSlicer.reducer;
