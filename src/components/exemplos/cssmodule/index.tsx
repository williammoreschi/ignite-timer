import styles from './index.module.css'
interface ButtonProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success'
  text: string
}
export function ButtonCssModule({ color = 'primary', text }: ButtonProps) {
  return <button className={`${styles.button} ${styles[color]}`}>{text}</button>
}
