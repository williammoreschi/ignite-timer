import { ButtonContainer, ButtonColor } from './index.styles';
interface ButtonProps {
  color?: ButtonColor;
  text: string;
}
export function ButtonStyleComponent({ color = 'primary', text }: ButtonProps) {
  return (<ButtonContainer background={color}>{text}</ButtonContainer>);
}