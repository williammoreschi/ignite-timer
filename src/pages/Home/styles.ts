import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

const BaseCountDownButton = styled.button`
  width: 100%;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const StartCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
export const StoptCountDownButton = styled(BaseCountDownButton)`
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme['red-700']};
  }
`
