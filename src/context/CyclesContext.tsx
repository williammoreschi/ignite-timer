import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCyclesId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer-cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return { cycles: [], activeCycles: null }
    },
  )

  const { cycles, activeCyclesId } = cyclesState

  const activeCycles = cycles.find((cycle) => cycle.id === activeCyclesId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycles) {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycles.startDate),
      )
      return secondsDifference
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer-cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second)
  }

  function markCurrentCyclesAsFinished() {
    dispatch(markCurrentCyclesAsFinishedAction())
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
    dispatch(interruptedCurruntCycleAction())
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
