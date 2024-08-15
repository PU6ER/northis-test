import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { api } from './api/api'

const logger = createLogger({
	collapsed: true,
})

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
	reducer: reducers,
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware).concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
