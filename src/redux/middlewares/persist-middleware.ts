import { Middleware } from 'redux'
import { RootState, AppDispatch } from '..'

export const persistMiddleware: Middleware<{}, RootState> =
  ({ dispatch }: { dispatch: AppDispatch }) =>
  next =>
  action => {}
