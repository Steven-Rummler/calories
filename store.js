import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";
const _ = require('lodash');

const slice = createSlice({
    name: 'data',
    initialState: {
        entries: []
    },
    reducers: {
        updateData: (state, action) => {
            state = action.payload;
        },
        addEntry: (state, action) => {
            state.entries.push(action.payload);
        },
        removeEntry: (state, action) => {
            state.entries = state.entries.filter(e => !_.isEqual(e, action.payload));
        }
    },
});

const { updateData, addEntry, removeEntry } = slice.actions;

const getEntries = state => state.data.entries;

const reducer = combineReducers({
    data: slice.reducer
});

const store = configureStore({
    reducer
});

export { store, updateData, addEntry, removeEntry, getEntries };