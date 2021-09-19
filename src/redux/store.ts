import rootReducer from './slices'
import { insertCell } from './slices/cells-reducer'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

store.dispatch(insertCell(null, 'code'))
