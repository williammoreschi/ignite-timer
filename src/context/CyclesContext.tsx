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

interface ICycleState {
  cycles: ICycle[]
  activeCyclesId: string | null
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
  const [cyclesState, dispatch] = useReducer(
    (state: ICycleState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCyclesId: action.payload.newCycle.id,
          }
        case 'INTERRUPTED_CURRUNT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload.activeCyclesId) {
                return { ...cycle, interruptDate: new Date() }
              }
              return cycle
            }),
            activeCyclesId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINECHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload.activeCyclesId) {
                return { ...cycle, fineshedtDate: new Date() }
              }
              return cycle
            }),
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCyclesId: null,
    },
  )

  const { cycles, activeCyclesId } = cyclesState

  const activeCycles = cyclesState.cycles.find(
    (cycle) => cycle.id === activeCyclesId,
  )

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
  }

  function interruptCycle() {
    dispatch({
      payload: {
        activeCyclesId,
      },
      type: 'INTERRUPTED_CURRUNT_CYCLE',
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
