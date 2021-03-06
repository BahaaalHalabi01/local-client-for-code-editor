import { Fragment, useEffect, useRef } from 'react'
import { useSelector } from '../hooks/use-typed-selector'
import { useActions } from '../hooks/use-actions'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import './css/cell-list.css'

const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions()
  const { data } = useSelector(state => state.cells)
  const fetchRef = useRef(fetchCells)
  const saveRef = useRef(saveCells)

  useEffect(() => {
    fetchRef.current()
  }, [])

  useEffect(() => {
    saveRef.current()
  }, [])

  let renderedCells

  if (data.length > 0) {
    renderedCells = data.map(item => (
      <Fragment key={item.id}>
        <CellListItem cell={item} />
        {/* Add Cell is rendered this way for DOM structure purposes items are always added behind */}
        <AddCell prevCellId={item.id} />
      </Fragment>
    ))
  }

  return (
    <div className='cell-list'>
      <AddCell prevCellId={null} lastCell={data.length === 0} />
      <h1>{renderedCells}</h1>
    </div>
  )
}
export default CellList
