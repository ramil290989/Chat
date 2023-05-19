import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  channels: [],
  currentChannelId: 0,
  messages: [],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    whriteToken: (state, action) => {
      state.token = action.payload;
    },
    loadChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    deleteChannel: (state, action) => {
      const channels = state.channels.filter((channel) => channel.id !== action.payload);
      state.channels = channels;
    },
    changeCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessage: (state, action) => {
      const messages = state.messages.filter((message) => message.id !== action.payload);
      state.messages = messages;
    },
  },
});

export const {
  whriteToken,
  loadChannels,
  addChannel,
  deleteChannel,
  changeCurrentChannel,
  loadMessages,
  addMessage,
  deleteMessage,
} = userDataSlice;

export default userDataSlice.reducer;
