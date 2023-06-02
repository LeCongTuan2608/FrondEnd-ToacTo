import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   chatBoxes: [],
};

const chatBoxSlice = createSlice({
   name: 'chatBox',
   initialState,
   reducers: {
      addChatBox: (state, action) => {
         !state.chatBoxes.map((box) => box.id).includes(action.payload.id) &&
            (state.chatBoxes = [action.payload, ...state.chatBoxes]);
      },
      removeChatBox: (state, action) => {
         state.chatBoxes = state.chatBoxes.filter((item) => item.id !== action.payload);
      },
   },
});
export const { addChatBox, removeChatBox } = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
