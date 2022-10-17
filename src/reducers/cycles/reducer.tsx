import produce from 'immer'
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
    case ActionTypes.ADD_NEW_CYCLE: {
      const { newCycle } = action.payload
      return produce(state, (draft) => {
        draft.cycles.push(newCycle)
        draft.activeCyclesId = newCycle.id
      })
    }
    case ActionTypes.INTERRUPTED_CURRUNT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCyclesId
      })
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCyclesId = null
        draft.cycles[currentCycleIndex].interruptDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINECHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCyclesId
      })

      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeCyclesId = null
        draft.cycles[currentCycleIndex].fineshedtDate = new Date()
      })
    }
    default:
      return state
  }
}
