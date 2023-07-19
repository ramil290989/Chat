/* eslint no-param-reassign: 0 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  window: null,
  show: false,
  name: null,
  id: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalShow: (state, { payload }) => {
      state.show = true;
      state.window = payload.window;
      state.name = payload.name;
      state.id = payload.id;
    },
    modalHide: () => initialState,
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
