import { createAsyncThunk } from '@reduxjs/toolkit'
import bundle from '../../bundler'
import axios, { AxiosError } from 'axios'
import { Cell } from '../cell'

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
  'cells',
  async (input, { rejectWithValue }) => {
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells')
      return {
        data,
      }
    } catch (error: any) {
      let err: AxiosError<{ message: string }> = error

      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response)
    }
  }
)
