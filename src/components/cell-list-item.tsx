import { Cell } from '../redux/'
import TextEditor from './text-editor'
import CodeCell from './code-cell'
import ActionBar from './action-bar'
import './css/cell-list-item.css'

interface CellListItemProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let cells: JSX.Element =
    cell.type === 'code' ? (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    )

  return <div className='cell-list-item'>{cells}</div>
}

export default CellListItem
