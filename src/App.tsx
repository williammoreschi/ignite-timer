import { ButtonStyleComponent } from "./components/exemplos/csscomponents";
import { ButtonCssModule } from "./components/exemplos/cssmodule";

export function App() {
  return (
    <>
      <ButtonCssModule text="Primary" color="primary" />
      <ButtonCssModule text="Secondary" color="secondary" />
      <ButtonCssModule text="Danger" color="danger" />
      <ButtonCssModule text="Success" color="success" />
      <ButtonCssModule text="Default" />
      <br />
      <br />
      <ButtonStyleComponent text="Primary" color="primary" />
      <ButtonStyleComponent text="Secondary" color="secondary" />
      <ButtonStyleComponent text="Danger" color="danger" />
      <ButtonStyleComponent text="Success" color="success" />
      <ButtonStyleComponent text="Default" />
    </>
  )
}