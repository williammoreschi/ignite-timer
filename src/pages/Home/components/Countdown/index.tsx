import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContex } from '../../../../context/CyclesContex'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycles,
    activeCyclesId,
    markCurrentCyclesAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContex)

  const totalSeconds = activeCycles ? activeCycles.minutesAmount * 60 : 0
  const currentSeconds = activeCycles ? totalSeconds - amountSecondsPassed : 0

  useEffect(() => {
    let interval: number
    if (activeCycles) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycles.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCyclesAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycles,
    activeCyclesId,
    totalSeconds,
    setSecondsPassed,
    markCurrentCyclesAsFinished,
  ])

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secodsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secodsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycles) {
      document.title = `${minutes}:${seconds} - Ignite Timer`
    } else {
      document.title = `Ignite Timer`
    }
  }, [minutes, seconds, activeCycles])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
