import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { CellTypes, Cell } from '../cell'

type Direction = 'up' | 'down'

type CellsState = {
  readonly loading: boolean
  readonly error: string | null
  readonly data: Cell[]
}

const initialState: CellsState = {
  loading: false,
  error: null,
  data: [],
}

//helper function for index finding
const findIndex = (data: Cell[], id: string | null): number => {
  return data.findIndex(item => item.id === id)
}

//Using Immer and Redux
const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    // Insering a Cell
    insertCell: {
      // Insert Cell Reducer
      reducer: (
        state,
        action: PayloadAction<{ id: string | null; type: CellTypes }>
      ) => {
        const cell: Cell = {
          data: '',
          type: action.payload.type,
          id: nanoid().substr(2, 4),
        }
        //Find Insert Index ( always insert before )
        const index = findIndex(state.data, action.payload.id)
        //Index doesnt exist add at the start
        if (index < 0) {
          state.data.unshift(cell)
          return state
        }
        //If it exits add behind it
        state.data.splice(index + 1, 0, cell)
        return state
      },
      // Insert cell action creator
      prepare: (id: string | null, type: CellTypes) => {
        return {
          payload: {
            id,
            type,
          },
        }
      },
    },
    /////////////////////////////////////
    // Moving a cell
    moveCell: {
      // Move Cell Reducer
      reducer: (
        state,
        action: PayloadAction<{ id: string; direction: Direction }>
      ) => {
        const { direction, id } = action.payload
        //find the cell index
        const index: number = findIndex(state.data, id)
        if (index < 0) return state
        //find target index to be moved to
        const targetIndex: number = direction === 'up' ? index - 1 : index + 1
        //check if index out of bound and return
        console.log(targetIndex)
        if (targetIndex < 0 || targetIndex > state.data.length - 1) return state
        //switch based on direction
        switch (direction) {
          case 'up': {
            let temp = state.data[targetIndex]
            state.data[targetIndex] = state.data[index]
            state.data[index] = temp
            return state
          }
          case 'down': {
            let temp = state.data[targetIndex]
            state.data[targetIndex] = state.data[index]
            state.data[index] = temp
            return state
          }
          default:
            return state
        }
      },
      // Move Cell action creator
      prepare: (id: string, direction: Direction) => {
        return {
          payload: {
            id,
            direction,
          },
        }
      },
    },
    /////////////////////////////////
    // Deleting a Cell
    // can be done without a prepare callback ( reducer and action creator in 1 line but done like this for consistency purposes)
    deleteCell: {
      reducer: (state, action: PayloadAction<{ id: string }>) => {
        //find the index of the cell to delete
        const index = findIndex(state.data, action.payload.id)
        if (index < 0) return state
        //delete the cell
        state.data.splice(index, 1)
        return state
      },
      prepare: (id: string) => {
        return {
          payload: {
            id,
          },
        }
      },
    },
    ////////////////////////////////
    // Update Cell Values
    updateCell: {
      reducer: (state, action: PayloadAction<{ id: string; data: string }>) => {
        //find the cell
        const index = findIndex(state.data, action.payload.id)
        state.data[index].data = action.payload.data
      },
      prepare: (id: string, data: string) => {
        return {
          payload: {
            id,
            data,
          },
        }
      },
    },
  },
})

export const { insertCell, moveCell, deleteCell, updateCell } =
  cellsSlice.actions

export const cellActionCreators = {
  insertCell,
  moveCell,
  updateCell,
  deleteCell,
}

export default cellsSlice.reducer
