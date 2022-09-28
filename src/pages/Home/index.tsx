import { useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountDownButton,
  StoptCountDownButton,
} from './styles'
import { NewCyleForm } from './components/NewCyleForm'
import { Countdown } from './components/Countdown'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  fineshedtDate?: Date
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser no máximo 60 minutos'),
})

// interface NewCycleForm {
//   task: string
//   minutesAmount: number
// }

type NewCycleForm = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCyclesId, setActiveCyclesId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycles = cycles.find((cycle) => cycle.id === activeCyclesId)

  function handleCreateNewCycle(data: NewCycleForm) {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCyclesId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setAmountSecondsPassed(0)
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCyclesId) {
          return { ...cycle, interruptDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCyclesId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCyleForm activeCycles={activeCycles} register={register} />

        <Countdown
          activeCycles={activeCycles}
          activeCyclesId={activeCyclesId}
          setCycles={setCycles}
          amountSecondsPassed={amountSecondsPassed}
          setAmountSecondsPassed={setAmountSecondsPassed}
        />

        {activeCycles ? (
          <StoptCountDownButton
            type="button"
            onClick={() => handleInterruptCycle()}
          >
            <HandPalm size="24" />
            Interromper
          </StoptCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size="24" />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
