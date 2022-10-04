import { createContext, ReactNode, useReducer, useState } from 'react'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  fineshedtDate?: Date
}

interface ICreateNewCycle {
  task: string
  minutesAmount: number
}

interface ICyclesContex {
  activeCycles: ICycle | undefined
  activeCyclesId: string | null
  amountSecondsPassed: number
  cycles: ICycle[]
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (second: number) => void
  createNewCycle: (data: ICreateNewCycle) => void
  interruptCycle: () => void
}

interface ICylesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as ICyclesContex)

export function CyclesContextProvider({
  children,
}: ICylesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)
  const [cycles, dispatch] = useReducer((state: ICycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const activeCycles = cycles.find((cycle) => cycle.id === activeCyclesId)

  function markCurrentCyclesAsFinished() {
    dispatch({
      payload: {
        activeCyclesId,
      },
      type: 'MARK_CURRENT_CYCLE_AS_FINECHED',
    })
    // setCycles((state) =>
    //  state.map((cycle) => {
    //    if (cycle.id === activeCyclesId) {
    //      return { ...cycle, fineshedtDate: new Date() }
    //    }
    //    return cycle
    //  }),
    // )
  }

  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second)
  }

  function createNewCycle(data: ICreateNewCycle) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setAmountSecondsPassed(0)

    dispatch({
      payload: {
        newCycle,
      },
      type: 'ADD_NEW_CYCLE',
    })
    // setCycles((state) => [...state, newCycle])
    setActiveCyclesId(newCycle.id)
  }

  function interruptCycle() {
    dispatch({
      payload: {
        activeCyclesId,
      },
      type: 'INTERRUPTED_CURRUNT_CYCLE',
    })
    // setCycles((state) =>
    //  state.map((cycle) => {
    //    if (cycle.id === activeCyclesId) {
    //      return { ...cycle, interruptDate: new Date() }
    //    }
    //    return cycle
    //  }),
    // )
    setActiveCyclesId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycles,
        activeCyclesId,
        amountSecondsPassed,
        cycles,
        createNewCycle,
        interruptCycle,
        markCurrentCyclesAsFinished,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
