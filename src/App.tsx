import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { makeTitle, makeUserName } from './functions/StringUtil'
import { useCounter } from './hooks/useCounter'

function App() {
  const [result, setResult] = useState("init")
  const onClickFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => setResult(JSON.stringify(json)))
  }

  const onClickAxios = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/2')
      .then(json => setResult(JSON.stringify(json.data)))
  }

  const { count, increase, decrease } = useCounter()

  return (
    <>
      <h1>{makeTitle('vite + React')}</h1>
      <p>{makeUserName('yuji')}</p>
      <div>
        <span>{result}</span>
      </div>
      <button onClick={onClickFetch}>call fetch</button>
      <button onClick={onClickAxios}>call axios</button>
      <div>
        <span>count is {count}</span>
      </div>
      <button onClick={increase}>call increase</button>
      <button onClick={decrease}>call decrease</button>
    </>
  )
}

export default App
