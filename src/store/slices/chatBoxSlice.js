import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   chatBoxes: [],
};

const chatBoxSlice = createSlice({
   name: 'chatBox',
   initialState,
   reducers: {
      addChatBox: (state, action) => {
         if (
            !state.chatBoxes.map((box) => box.id).includes(action.payload.id) ||
            state.chatBoxes.filter((u) => u.member.join() === action.payload.member.join())
               .length === 0
         ) {
            state.chatBoxes = [action.payload, ...state.chatBoxes];
         }
      },
      removeChatBox: (state, action) => {
         if (state.chatBoxes.map((box) => box.id).includes(action.payload)) {
            state.chatBoxes = state.chatBoxes.filter((item) => {
               return !(item.id === action.payload);
            });
         } else if (
            state.chatBoxes.filter((u) => u.member.join() === action.payload.join()).length !== 0
         ) {
            state.chatBoxes = state.chatBoxes.filter((item) => {
               return !(item.member.join() === action.payload.join());
            });
         }
      },
   },
});
export const { addChatBox, removeChatBox } = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
