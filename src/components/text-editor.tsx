import MDEditor from '@uiw/react-md-editor'
import { useState, useEffect, useRef } from 'react'
import './css/text-editor.css'
import { Cell } from '../redux'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editting, setEditting] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const { data, id } = cell
  const { updateCell } = useActions()

  const handleChange = (value: string): void => {
    updateCell(id, value)
  }

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return

      setEditting(false)
    }

    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  // @todo needs styling

  if (editting) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor
          value={data}
          onChange={value => {
            handleChange(value || '')
          }}
        />
      </div>
    )
  } else
    return (
      <div className='text-editor card' onClick={() => setEditting(true)}>
        <div className='card-content'>
          <MDEditor.Markdown source={data || 'Click to Edit'} />
        </div>
      </div>
    )
}

export default TextEditor
