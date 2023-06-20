import { crearUsuarioYContraseña } from '../lib/index.js';

export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.classList.add('fondo');
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('btn-register-register');
  buttonRegister.textContent = 'Registrate';
  homeDiv.innerHTML += `
  <div class="form-container register-container">
        <h2 class="register-texto">Registro</h2>
        <img src="img/log_720.png" alt="logo" class="imgLogoRegister">
        <input  class="input-register-name" id="name" type="text" placeholder="Nombre">
        <input class="input-register-email" id="email" type="email" placeholder="Email">
        <input class="input-register-contraseña" id="password"  type="password" placeholder="password">
        <input class="input-register-contraseña-confirmar" type="password" placeholder="Confirm password">
        <a class="tienes-cuenta-inicia">¿YA TIENES CUENTA? INICIA SESIÓN</a>
    </div>
  `;
  /*------------------------------------------------------*/
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  /*------------------------------------------------------*/

  const inputEmail = homeDiv.querySelector('#email');
  const inputPassword = homeDiv.querySelector('#password');
  const inputName = homeDiv.querySelector('#name');

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioYContraseña(inputEmail.value, inputPassword.value, inputName.value);
    console.log(inputEmail.value, inputPassword.value, inputEmail.value);
  });
  homeDiv.appendChild(buttonRegister);

  return homeDiv;
};
