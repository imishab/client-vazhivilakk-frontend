import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
    userInfo: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
            localStorage.setItem('token', action.payload.token);
        },
        clearUserDetails: (state) => {
            state.userInfo = null;
            state.token = null;
            if (typeof window !== 'undefined') { // Ensure it's running on the client side
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
            }
        },
        loadUserDetails: (state) => {
            if (typeof window !== 'undefined') { // Ensure it's running on the client side
                const userInfo = localStorage.getItem('userInfo');
                const token = localStorage.getItem('token');
                if (userInfo) {
                    state.userInfo = JSON.parse(userInfo);
                }
                if (token) {
                    state.token = token;
                }
            }
        },

    },
});

export const { setUserDetails, clearUserDetails, loadUserDetails } = userSlice.actions;

export default userSlice.reducer;
