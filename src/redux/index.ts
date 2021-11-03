import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favoritesSlice from './slices/favoritesSlice'

export type State = ReturnType<typeof reducer>

const reducer = combineReducers({
  favorites: favoritesSlice.reducer,
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
