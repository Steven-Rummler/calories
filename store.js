import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";

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
        }
    },
});

const { updateData, addEntry } = slice.actions;

const getEntries = state => state.data.entries;

const reducer = combineReducers({
    data: slice.reducer
});

const store = configureStore({ reducer });

export { store, updateData, addEntry, getEntries };