import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   chatBoxes: [],
};

const chatBoxSlice = createSlice({
   name: 'chatBox',
   initialState,
   reducers: {
      addChatBox: (state, action) => {
         const newChatBox = [...state.chatBoxes];
         const checkBox =
            newChatBox.filter(
               (u) => JSON.stringify(u.member) === JSON.stringify(action.payload.member),
            ).length === 0;
         if (checkBox || (action.payload?.id && checkBox)) {
            if (
               newChatBox.length === 0 ||
               !state.chatBoxes.map((box) => box.id).includes(action.payload.id)
            ) {
               state.chatBoxes = [action.payload, ...state.chatBoxes];
            }
         } else {
         }
      },
      // updateChatBox: () => {

      // },
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
      removeChatBoxAll: (state, action) => {
         state.chatBoxes = [];
      },
   },
});
export const { addChatBox, removeChatBox, removeChatBoxAll } = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
