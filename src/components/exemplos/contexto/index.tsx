import { createContext, useContext, useState } from 'react'

const CountContext = createContext({} as any)

function PageContext() {
  const { count } = useContext(CountContext)
  return <h1>PageContext {count}</h1>
}

function OtherPageContext() {
  const { count, setCount } = useContext(CountContext)
  return (
    <>
      <h1>OtherPageContext {count}</h1>
      <button onClick={() => setCount((state: number) => state + 1)}>
        countcontext is {count}
      </button>
    </>
  )
}

function PagePros({ countProps }: any) {
  return <h1>PageProps {countProps}</h1>
}

function OtherPagePros({ countProps, setCountProps }: any) {
  return (
    <>
      <h1>OtherPageProps {countProps}</h1>
      <button onClick={() => setCountProps((state: number) => state + 1)}>
        countprops is {countProps}
      </button>
    </>
  )
}

export function Contexto() {
  const [count, setCount] = useState(0)
  const [countProps, setCountProps] = useState(0)

  return (
    <>
      <CountContext.Provider value={{ count, setCount }}>
        <div>
          <PageContext />
          <OtherPageContext />
        </div>
      </CountContext.Provider>
      <hr />
      <PagePros countProps={countProps} />
      <OtherPagePros countProps={countProps} setCountProps={setCountProps} />
    </>
  )
}
