import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const _ = require('lodash');

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

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

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

const persistor = persistStore(store);

export { store, persistor, updateData, addEntry, removeEntry, getEntries };