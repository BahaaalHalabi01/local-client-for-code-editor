import { useEffect, useRef } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'
import { Cell } from '../redux'
import { useActions } from '../hooks/use-actions'
import { useSelector } from '../hooks/use-typed-selector'
import { useCumilativeCode } from '../hooks/use-cumilative-code'
import './css/code-cell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { data, id } = cell
  const { updateCell, createBundle } = useActions()
  //gathering the code from previous cells

  const cumlativeCode = useCumilativeCode(id)

  //for the use effect depency array, if calling createBundle inside it directly
  // it is needed to put it in the dependancy array - breaks the cycle
  // fixed with useMemo also
  const createBundleRef = useRef(createBundle)
  const bundleRef = useRef(false)

  const bundle = useSelector(state => state.bundles[id])

  useEffect(() => {
    // to not overlap error messages when no code is written
    // or no overlapping show() function
    // do not bundle the code before untill there is code
    // in the current cell

    if (data === '') {
      createBundleRef.current({ id, code: '' })
      return
    }

    //render it once only
    if (!bundleRef.current) {
      createBundleRef.current({ id, code: cumlativeCode })
      bundleRef.current = true
      return
    }
    const timer = setTimeout(async () => {
      createBundleRef.current({ id, code: cumlativeCode })
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [cumlativeCode, id, data])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 15px)',

          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initalValue={data}
            onChange={value => updateCell(id, value)}
          />
        </Resizable>
        <div className='preview-cover'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-primary' max='100'>
                {' '}
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} status={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
