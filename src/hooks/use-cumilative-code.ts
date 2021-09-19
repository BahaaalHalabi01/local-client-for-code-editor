import { useSelector } from './use-typed-selector'

export const useCumilativeCode = (id: string): string => {
  return useSelector(state => {
    const cumilativeCode = []
    const { data } = state.cells

    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        
        var show = (value)=>{
          const root = document.querySelector('#root')
      
          if(typeof value === 'object'){
            if (value.$$typeof && value.props){
              _ReactDOM.render(value,root);
            }else {
              root.innerHTML = JSON.stringify(value);
            }
          }else{
              root.innerHTML = value
          }
      
        }
        `

    const showFuncNoop = `
        var show = (value)=>{}
        `

    for (let c of data) {
      if (c.type === 'code') {
        if (c.id === id) {
          cumilativeCode.push(showFunc)
        } else {
          cumilativeCode.push(showFuncNoop)
        }
        cumilativeCode.push(c.data)
      }
    }
    return cumilativeCode.join('\n')
  })
}
