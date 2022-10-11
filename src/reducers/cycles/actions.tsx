import { ICycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPTED_CURRUNT_CYCLE = 'INTERRUPTED_CURRUNT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINECHED = 'MARK_CURRENT_CYCLE_AS_FINECHED',
}

export function addNewCycleAction(newCycle: ICycle) {
  return {
    payload: {
      newCycle,
    },
    type: ActionTypes.ADD_NEW_CYCLE,
  }
}

export function interruptedCurruntCycleAction(activeCyclesId: string | null) {
  return {
    payload: {
      activeCyclesId,
    },
    type: ActionTypes.INTERRUPTED_CURRUNT_CYCLE,
  }
}

export function markCurrentCyclesAsFinishedAction(
  activeCyclesId: string | null,
) {
  return {
    payload: {
      activeCyclesId,
    },
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINECHED,
  }
}
