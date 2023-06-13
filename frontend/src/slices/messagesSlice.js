import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlice.js';
import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({});

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
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const removeChannelId = action.payload.id;
        const notRemoveMessages = Object.values(state.entities).filter((message) => message.channelId !== removeChannelId);
        messagesAdapter.setAll(state, notRemoveMessages);
      })
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
