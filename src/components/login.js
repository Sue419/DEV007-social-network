import { loginUsuarioYContraseña } from '../lib/index.js';

export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('containerLogin');

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia';
  homeDiv.innerHTML += `
  <div class="form-container login-container">
      <h2>INICIA SESIÓN</h2>
      <img src="img/logo.png" alt="logo" class="imgLogoLogin">
        <input class="input-email" id="email" type="email" placeholder="Email">
        <input class="input-password" id="password" type="password" placeholder="Password">
        <span>O ingresa con</span>
        <br>
        <div class="social-container">
        </div>
      <span>¿No tienes una cuenta? Registrate</span>
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
  /* -----------------REGRESA AL LOGIN---------------------------*/

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);

  return homeDiv;
};
