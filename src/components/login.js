import { loginUsuarioYContraseña } from '../lib/index.js';

export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo');

  const buttonLogin = document.createElement('button');
  buttonLogin.classList.add('inicia-sesion-login');
  buttonLogin.textContent = 'Iniciar Sesión';
  homeDiv.innerHTML += `
  <div class="form-container login-container ">
      <h2 class="inicia-texto">INICIA SESIÓN</h2>
      <img src="img/log_720.png" alt="logo" class="imgLogoLogin">
        <input class="input-email" id="email" type="email" placeholder="Email">
        <input class="input-password" id="password" type="password" placeholder="Password">
        <a class="olvidoContraseña">¿OLVIDASTE TU CONTRASEÑA?</a>
        <span class="ingresaCon-google">O ingresa con</span>
        <br>
        <div class="fondo-icono-google"></div>
        <img class="img-google" src="img/ios_google_icon_360.png" alt="logo-google">
      <span class="no-cuenta-registrate">¿No tienes una cuenta? Registrate</span>
    </div>
  `;
  
  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginUsuarioYContraseña(
      inputEmail.value,
      inputPassword.value,
    ).then(() => {
      onNavigate('/feed');
    });
  });

  homeDiv.appendChild(buttonLogin);

  /* -----------------REGRESA AL HOME---------------------------*/

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
