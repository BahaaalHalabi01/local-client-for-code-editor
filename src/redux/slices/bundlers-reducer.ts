import { createSlice } from '@reduxjs/toolkit'
import bundle from '../../bundler'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type BundlesState = {
  [key: string]:
    | {
        readonly loading: boolean
        readonly code: string
        readonly err: string
      }
    | undefined
}

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

const initialState: BundlesState = {}

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    deleteBundle: (state, action) => {
      delete state[action.payload]
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createBundle.pending, (state, action) => {
        // Waiting for the bunde
        state[action.meta.arg.id] = { loading: true, code: '', err: '' }
      })
      .addCase(createBundle.fulfilled, (state, action) => {
        // Bundle Finished
        const { id, code, err } = action.payload
        state[id] = { loading: false, code, err }
      })
  },
})

export const { deleteBundle } = bundlesSlice.actions

export const bundlesActionCreator = { createBundle, deleteBundle }

export default bundlesSlice.reducer
