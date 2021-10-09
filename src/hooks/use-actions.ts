import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../redux'
import { useAppDispatch } from '../redux'

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch])
}
