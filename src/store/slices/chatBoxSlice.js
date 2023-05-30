import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   chatBoxes: [],
};

const chatBoxSlice = createSlice({
   name: 'chatBox',
   initialState,
   reducers: {
      addChatBox: (state, action) => {
         !state.chatBoxes
            .map((box) => box.user_info.user_name)
            .includes(action.payload.user_info.user_name) &&
            (state.chatBoxes = [action.payload, ...state.chatBoxes]);
      },
      removeChatBox: (state, action) => {
         state.chatBoxes = state.chatBoxes.filter(
            (item) => item.user_info.user_name !== action.payload,
         );
      },
   },
});
export const { addChatBox, removeChatBox } = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
