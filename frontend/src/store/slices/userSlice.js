import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  stats: null,
  favorites: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProfile, setStats, setFavorites, setLoading } = userSlice.actions;
export default userSlice.reducer;