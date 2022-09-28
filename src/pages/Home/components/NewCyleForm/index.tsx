import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

interface INewCycleFormProps {
  register: any
  activeCycles: any
}

export function NewCyleForm({ register, activeCycles }: INewCycleFormProps) {
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycles}
      />

      <datalist id="task-suggestions">
        <option value="Tarefa 1" />
        <option value="Tarefa 2" />
        <option value="Tarefa 3" />
        <option value="Ola Mundo" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycles}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
