import styled, { css } from 'styled-components';

export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  background: ButtonColor;
}

const buttonVariantes = {
  primary: 'blue',
  secondary: 'yellow',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 42px;

  ${props => {
    return css`background-color: ${buttonVariantes[props.background]}`;
  }}
`;