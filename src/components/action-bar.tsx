import React from 'react'
import { useActions } from '../hooks/use-actions'
import './css/action-bar.css'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell, deleteBundle } = useActions()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event.currentTarget.title) {
      case 'Up': {
        moveCell(id, 'up')
        break
      }
      case 'Down': {
        moveCell(id, 'down')
        break
      }
      case 'Delete': {
        deleteCell(id)
        deleteBundle(id)
        break
      }
    }
  }
  return (
    <div className='action-bar'>
      <button
        title='Up'
        onClick={handleClick}
        className='button is-primary is-small'
      >
        <span className='icon'>
          <i className='fas fa-arrow-up'></i>
        </span>
      </button>
      <button
        title='Down'
        onClick={handleClick}
        className='button is-primary is-small'
      >
        <span className='icon'>
          <i className='fas fa-arrow-down'></i>
        </span>
      </button>
      <button
        title='Delete'
        onClick={handleClick}
        className='button is-primary is-small'
      >
        <span className='icon'>
          <i className='fas fa-trash-alt'></i>
        </span>
      </button>
    </div>
  )
}

export default ActionBar
