import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import route from '../routes.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const dataRoute = route.data();
    const dataConfig = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(dataRoute, dataConfig);
    return response.data;
  }
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannel: {},
  defaultChannel: {},
  loadingStatus: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload.id);
      if (state.currentChannel.id === payload.id) {
        state.currentChannel = state.defaultChannel;
      }
    },
    changeCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannel = _.find(action.payload.channels, (channel) => channel.id === action.payload.currentChannelId);
        state.defaultChannel = state.currentChannel;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
