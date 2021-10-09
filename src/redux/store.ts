import rootReducer from './slices'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
