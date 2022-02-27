import { createSlice } from "@reduxjs/toolkit";

export const informationSlice = createSlice({
  name: "User Information",
  initialState: {
    user_id: null,
    first_name: null,
    last_name: null,
    birthday: null, 
    password: null,
    gender_id: 0,
  },
  reducers: {
    setInformation: (state, action) => {
      state.user_id= action.payload.user_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.birthday = action.payload.birthday;
      state.password = action.payload.password;
      state.gender_id = action.payload.gender_id;
    },
  },
});

export const { setInformation } = informationSlice.actions;
export default informationSlice.reducer;