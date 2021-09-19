import { useRef, useEffect, ReactElement } from 'react'
import './css/preview.css'

interface PreviewProps {
  code: string
  status: string
}

const html = `
    <html>
    <head>
    
    </head>
    <body>
      <div id="root"></div>
      <script>
      const handleError = (err)=>{
        const root = document.querySelector('#root')
          root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>'+err+'</div>'
      }
      window.addEventListener('error',(event)=>{
        event.preventDefault()
        handleError(event.error)
      })


      window.addEventListener('message',(event)=>{
        try{
          eval(event.data);
        }catch(err){
          handleError(err)
        }
        
      },false)
      </script>
    </body>
    </html>
  
    `

const Preview: React.FC<PreviewProps> = ({ code, status }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (iframe.current) iframe.current.srcdoc = html
    setTimeout(() => {
      if (iframe.current?.contentWindow)
        iframe.current?.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code, status])

  let data: ReactElement

  status
    ? (data = (
        <div className='preview-status'>
          <h1>Syntax Error</h1>
          <h2>{status}</h2>
        </div>
      ))
    : (data = (
        <iframe
          ref={iframe}
          sandbox='allow-scripts'
          title='codeExecuter'
          srcDoc={html}
        />
      ))

  return <div className='preview-wrapper'>{data}</div>
}

export default Preview
