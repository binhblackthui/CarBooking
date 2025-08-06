import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    authorization: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth:(state, action) => {
            const {user} =action.payload;
            return {
                ...state,
                isAuthenticated: user!== null,
                user: user,
                loading: false,
                authorization: user ? user.roleName: null,
            };
        },
        setLoading: (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        setLogout: (state) => {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                authorization: null,
            };
        },
    },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
export const initialAuthState = initialState;