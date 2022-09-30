import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { CyclesContex } from '../../context/CyclesContex'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContex)
  return (
    <HistoryContainer>
      <h1>Meu Historico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBr,
                    })}
                  </td>
                  <td>
                    {cycle.fineshedtDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycle.interruptDate && (
                      <Status statusColor="red">Interronpido</Status>
                    )}

                    {!cycle.fineshedtDate && !cycle.interruptDate && (
                      <Status statusColor="yellow">Em Andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
