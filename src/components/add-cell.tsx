import './css/add-cell.css'
import { useActions } from '../hooks/use-actions'
import React from 'react'

interface AddCellProps {
  prevCellId: string | null
  lastCell?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, lastCell = false }) => {
  const { insertCell } = useActions()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (event.currentTarget.title) {
      case 'code': {
        insertCell(prevCellId, 'code')
        break
      }
      case 'text': {
        insertCell(prevCellId, 'text')
        break
      }
    }
  }

  return (
    <div className={`add-cell ${lastCell && 'last-cell'}`}>
      <div className='add-btns'>
        <button
          title='code'
          onClick={handleClick}
          className='button is-rounded is-primary is-small'
        >
          <span className='icon is-small'>
            <i className='fas fa-plus ' />
          </span>
          <span>Code</span>
        </button>
        <button
          title='text'
          onClick={handleClick}
          className='button is-rounded is-primary is-small'
        >
          <span className='icon is-small'>
            <i className='fas fa-plus ' />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default AddCell
