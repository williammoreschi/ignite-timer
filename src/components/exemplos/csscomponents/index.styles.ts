import styled, { css } from 'styled-components';

export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  background: ButtonColor;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 42px;

  ${props => {
    return css`background-color: ${props.theme[props.background]}`;
  }}
`;