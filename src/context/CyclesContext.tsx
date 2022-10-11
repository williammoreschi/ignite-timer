import { createContext, ReactNode, useReducer, useState } from 'react'
import {
  addNewCycleAction,
  interruptedCurruntCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer, ICycle } from '../reducers/cycles/reducer'

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

  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second)
  }

  function markCurrentCyclesAsFinished() {
    dispatch(markCurrentCyclesAsFinishedAction(activeCyclesId))
  }

  function createNewCycle(data: ICreateNewCycle) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setAmountSecondsPassed(0)

    dispatch(addNewCycleAction(newCycle))
  }

  function interruptCycle() {
    dispatch(interruptedCurruntCycleAction(activeCyclesId))
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
