import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/User";

const initialState: { users: User[]; loading: boolean; error: string | null } =
  {
    users: [],
    loading: false,
    error: null,
  };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
