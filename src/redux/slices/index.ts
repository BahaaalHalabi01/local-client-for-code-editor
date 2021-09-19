import cellsReducer from './cells-reducer'
import bundlesReducer from './bundlers-reducer'
import { combineReducers } from 'redux'
import { cellActionCreators } from './cells-reducer'
import { bundlesActionCreator } from './bundlers-reducer'

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
})

export default rootReducer

export const actionCreators = { ...cellActionCreators, ...bundlesActionCreator }

export type RootState = ReturnType<typeof rootReducer>
