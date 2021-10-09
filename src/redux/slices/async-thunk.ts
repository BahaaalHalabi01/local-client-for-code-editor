import { createAsyncThunk } from '@reduxjs/toolkit'
import bundle from '../../bundler'
import axios from 'axios'
import { Cell } from '../cell'
import { RootState } from './index'

interface UserData {
  id: string
  code: string
}

export const createBundle = createAsyncThunk(
  'bundles',
  async (input: UserData) => {
    const { code, id } = input
    const response = await bundle(code)
    return {
      ...response,
      id,
    }
  }
)

export const fetchCells = createAsyncThunk(
  'cells/fetch',
  async (input, { rejectWithValue }) => {
    try {
      const response = await axios.get('/cells')
      const data: Cell[] = response.data
      return data
    } catch (error: any) {
      return rejectWithValue(error.response)
    }
  }
)

export const saveCells = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>('cells/save', async (input, { getState, rejectWithValue }) => {
  try {
    const { cells } = getState()
    await axios.post('/cells', cells.data)
  } catch (error: any) {
    if (!error.response.data) {
      throw error
    }
    rejectWithValue(error.response.data)
  }
})
