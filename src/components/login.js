import { crearUsuarioYContraseña } from "../lib";

export const login = (onNavigate) => {
  const homeDiv = document.createElement("div");
  const buttonLogin = document.createElement("button");
  buttonLogin.textContent = "Inicia";
  homeDiv.innerHTML += `
  <div class="form-container login-container">
  <img src="img/c51f5ad5cc105c0b2cc6b278a04e4a82.gif" class="gato-img-logo" alt="logo">
      <h2>INICIA SESIÓN</h2>
        <input id="email" type="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <span>O ingresa con</span>
        <div class="social-container">
        </div>
      <span>¿No tienes una cuenta? Registrate</span>
    </div>
  
  `;
  const inputEmail = homeDiv.querySelector("#email");
  const inputPassword = homeDiv.querySelector("#password");

  buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();
    crearUsuarioYContraseña(inputEmail.value, inputPassword.value);
    console.log(inputEmail.value, inputPassword.value);
  });
  homeDiv.appendChild(buttonLogin);

  return homeDiv;
  /* -----------------REGRESA AL LOGIN---------------------------*/
  // const buttonHome = document.createElement("button");
  // buttonHome.textContent = "Regresar al Home";
  // buttonHome.addEventListener("click", () => onNavigate("/"));
  // homeDiv.appendChild(buttonHome);
};
