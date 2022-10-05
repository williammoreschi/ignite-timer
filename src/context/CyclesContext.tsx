import { createContext, ReactNode, useReducer, useState } from 'react'
import { ActionTypes, cyclesReducer, ICycle } from '../reducers/cyclesReducer'

interface ICreateNewCycle {
  task: string
  minutesAmount: number
}

interface ICyclesContext {
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

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({
  children,
}: ICylesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCyclesId: null,
  })

  const { cycles, activeCyclesId } = cyclesState

  const activeCycles = cyclesState.cycles.find(
    (cycle) => cycle.id === activeCyclesId,
  )

  function markCurrentCyclesAsFinished() {
    dispatch({
      payload: {
        activeCyclesId,
      },
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINECHED,
    })
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
      type: ActionTypes.ADD_NEW_CYCLE,
    })
  }

  function interruptCycle() {
    dispatch({
      payload: {
        activeCyclesId,
      },
      type: ActionTypes.INTERRUPTED_CURRUNT_CYCLE,
    })
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
