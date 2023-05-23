import chatBoxSlice from './slices/chatBoxSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReduce = {
   chatBox: chatBoxSlice,
};
const store = configureStore({
   reducer: rootReduce,
});
export default store;
