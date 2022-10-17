import { ActionTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  fineshedtDate?: Date
}

interface ICycleState {
  cycles: ICycle[]
  activeCyclesId: string | null
}

export function cyclesReducer(state: ICycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCyclesId: action.payload.newCycle.id,
      }
    case ActionTypes.INTERRUPTED_CURRUNT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCyclesId) {
            return { ...cycle, interruptDate: new Date() }
          }
          return cycle
        }),
        activeCyclesId: null,
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINECHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCyclesId) {
            return { ...cycle, fineshedtDate: new Date() }
          }
          return cycle
        }),
      }
    default:
      return state
  }
}
