import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
