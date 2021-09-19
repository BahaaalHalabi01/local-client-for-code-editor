import Editor, { OnMount, OnChange } from '@monaco-editor/react'
//can import this to type editor
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { useRef } from 'react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import './css/code-editor.css'

interface CodeEditorProps {
  initalValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initalValue, onChange }) => {
  // if typing editorref looks too bad, can use <any> type and ignroe type-script errors later
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

  const handleEditorDidMount: OnMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor
    if (editor) {
      editor.getModel()?.updateOptions({ tabSize: 2 })
    }
  }

  const handleEditorChange: OnChange = value => {
    if (value) onChange(value)
  }

  const onFormatClick = () => {
    if (editorRef.current) {
      const unformatted = editorRef.current.getValue()

      const formatted = prettier
        .format(unformatted, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          singleQuote: true,
        })
        .replace(/\n$/, '')
      editorRef.current.setValue(formatted)
    }
  }

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>

      <Editor
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        defaultValue={initalValue}
        height='100%'
        defaultLanguage='javascript'
        theme='vs-dark'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 20,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
