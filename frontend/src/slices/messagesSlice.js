import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  currentChannel: {},
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
        state.currentChannel = _.find(action.payload.channels, function(channel) { return channel.id === action.payload.currentChannelId});
      })
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
