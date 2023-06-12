import { crearUsuarioYContraseña } from "../lib";
export const register = (onNavigate) => {
  const homeDiv = document.createElement("div");
  const buttonRegister = document.createElement("button");
  buttonRegister.textContent = "Registrate";
  homeDiv.innerHTML += `
  <div class="form-container register-container">
      <form action="#">
        <h2>Registro</h2>
        <input  id="name" type="text" placeholder="Nombre">
        <input id="email" type="email" placeholder="Email">
        <input id="password"  type="password" placeholder="password">
        <input type="ConfirmPassword" placeholder="Confirm password">
        <div class="social-container">
        </div>
      </form>
    </div>
  `;
  /*------------------------------------------------------*/
  const buttonHome = document.createElement("button");
  buttonHome.textContent = "Regresar al Home";
  buttonHome.addEventListener("click", () => onNavigate("/"));
  homeDiv.appendChild(buttonHome);
  /*------------------------------------------------------*/

  const inputEmail = homeDiv.querySelector("#email");
  const inputPassword = homeDiv.querySelector("#password");

  buttonRegister.addEventListener("click", (e) => {
    e.preventDefault();
    crearUsuarioYContraseña(inputEmail.value, inputPassword.value);
    console.log(inputEmail.value, inputPassword.value);
  });
  homeDiv.appendChild(buttonRegister);

  return homeDiv;
};
