import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import { useEffect, useState } from 'react'
import './css/resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  let resizableProps: ResizableBoxProps

  useEffect(() => {
    let timer: any

    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      })
    }

    window.addEventListener('resize', listener, true)

    return () => {
      window.removeEventListener('resize', listener, true)
    }
  }, [width])

  switch (direction) {
    case 'horizontal':
      resizableProps = {
        className: 'resize-horizontal',
        width,
        height: Infinity,
        resizeHandles: ['e'],
        minConstraints: [innerWidth * 0.2, Infinity],
        maxConstraints: [innerWidth * 0.75, Infinity],
        onResizeStop: (event, data) => {
          setWidth(data.size.width)
        },
      }
      break

    case 'vertical':
      resizableProps = {
        width: Infinity,
        height: innerHeight * 0.2,
        resizeHandles: ['s'],
        minConstraints: [Infinity, innerHeight * 0.05],
        maxConstraints: [Infinity, innerHeight * 0.8],
      }
      break
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
